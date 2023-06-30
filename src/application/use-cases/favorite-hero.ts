import { FavoritesRepository } from '@application/repositories/favorites-repository';
import { Favorite } from '@domain/entities/favorite';
import { HerosService } from '@infra/services/contracts/heros.interface';
import { Injectable } from '@nestjs/common';

interface FavoriteHeroInput {
  characterId: string;
}

type FavoriteHeroOutput = void;

@Injectable()
export class FavoriteHero {
  constructor(
    readonly favoritesRepository: FavoritesRepository,
    readonly herosService: HerosService
  ) {}

  async execute({
    characterId,
  }: FavoriteHeroInput): Promise<FavoriteHeroOutput> {
    const character = await this.herosService.getCharacterDetails(characterId);

    if (!character) {
      throw new Error('Hero not found');
    }

    const favorite = Favorite.create({ character });

    await this.favoritesRepository.create(favorite);
  }
}
