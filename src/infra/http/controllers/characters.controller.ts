import { FavoriteHero } from '@application/use-cases/favorite-hero';
import { HasFavorited } from '@application/use-cases/has-favorited';
import { UnfavoriteHero } from '@application/use-cases/unfavorite-hero';
import { HerosService } from '@infra/services/contracts/heros.interface';
import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CharacterResource } from '../resources/character-resource';

@Controller('characters')
export class CharactersController {
  constructor(
    readonly favoriteHero: FavoriteHero,
    readonly unfavoriteHero: UnfavoriteHero,
    readonly hasFavorited: HasFavorited,
    readonly herosService: HerosService
  ) {}

  @Get()
  async search(
    @Query('q') q?: string,
    @Query('page') page?: string,
    @Query('per_page') perPage?: string
  ) {
    const result = await this.herosService.getCharacters({
      page: !!page ? Number(page) : undefined,
      perPage: !!perPage ? Number(perPage) : undefined,
      q,
    });

    return {
      data: result.data.map(CharacterResource.toHTTP),
      meta: result.meta,
    };
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    const [character, hasFavorited] = await Promise.all([
      await this.herosService.getCharacterDetails(id),
      await this.hasFavorited.execute({ characterId: id }),
    ]);

    if (!character) {
      throw new NotFoundException('Character not found');
    }

    return {
      character: CharacterResource.toHTTP(character),
      favorited: hasFavorited,
    };
  }

  @Post(':id/toggle-favorite')
  async toggleFavorite(@Param('id') id: string) {
    const hasFavorited = await this.hasFavorited.execute({ characterId: id });

    if (hasFavorited) {
      await this.unfavoriteHero.execute({ characterId: id });
      return;
    }

    await this.favoriteHero.execute({ characterId: id });
  }

  @Post(':id/favorite')
  async favorite(@Param('id') id: string) {
    await this.favoriteHero.execute({ characterId: id });
  }

  @Delete(':id/unfavorite')
  async unfavorite(@Param('id') id: string) {
    await this.unfavoriteHero.execute({ characterId: id });
  }
}
