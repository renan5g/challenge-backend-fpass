import { FavoritesRepository } from '@application/repositories/favorites-repository';
import { PaginationParams } from '@core/repositories/pagination-params';
import { Favorite } from '@domain/entities/favorite';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryFavoritesRepository implements FavoritesRepository {
  public items: Favorite[] = [];

  async findByCharacterId(characterId: string): Promise<Favorite | null> {
    const favorite = this.items.find(
      (item) => item.character.id === characterId
    );

    if (!favorite) {
      return null;
    }

    return favorite;
  }

  async create(favorite: Favorite) {
    this.items.push(favorite);
  }

  async save(favorite: Favorite): Promise<void> {
    const favoriteIndex = this.items.findIndex(
      (item) => item.id === favorite.id
    );

    if (favoriteIndex >= 0) {
      this.items[favoriteIndex] = favorite;
    }
  }

  async findMany({ page }: PaginationParams) {
    const favorites = this.items.slice((page - 1) * 20, page * 20);

    return favorites;
  }

  async delete(favorite: Favorite): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === favorite.id);

    this.items.splice(itemIndex, 1);
  }
}
