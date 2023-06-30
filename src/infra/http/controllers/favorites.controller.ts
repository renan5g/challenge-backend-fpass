import { ListFavorites } from '@application/use-cases/list-favorites';
import { Controller, Get, Query } from '@nestjs/common';
import { FavoriteResource } from '../resources/favorite-resource';

@Controller('favorites')
export class FavoritesController {
  constructor(readonly listFavorites: ListFavorites) {}

  @Get()
  async index(@Query('page') page: string) {
    const { favorites } = await this.listFavorites.execute({
      page: Number(page),
    });

    return {
      favorites: favorites.map((f) => FavoriteResource.toHTTP(f)),
    };
  }
}
