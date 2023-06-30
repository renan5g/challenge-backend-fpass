import { FavoritesRepository } from '@application/repositories/favorites-repository';
import { Favorite } from '@domain/entities/favorite';
import { Injectable } from '@nestjs/common';

interface ListFavoritesInput {
  page: number;
}

type ListFavoritesOutput = {
  favorites: Favorite[];
};

@Injectable()
export class ListFavorites {
  constructor(readonly favoritesRepository: FavoritesRepository) {}

  async execute({ page }: ListFavoritesInput): Promise<ListFavoritesOutput> {
    const favorites = await this.favoritesRepository.findMany({ page });

    return { favorites };
  }
}
