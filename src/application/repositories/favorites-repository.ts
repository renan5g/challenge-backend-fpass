import { PaginationParams } from '@core/repositories/pagination-params';
import { Favorite } from '@domain/entities/favorite';

export abstract class FavoritesRepository {
  abstract findByCharacterId(characterId: string): Promise<Favorite | null>;
  abstract findMany(params: PaginationParams): Promise<Favorite[]>;
  abstract create(favorite: Favorite): Promise<void>;
  abstract save(favorite: Favorite): Promise<void>;
  abstract delete(favorite: Favorite): Promise<void>;
}
