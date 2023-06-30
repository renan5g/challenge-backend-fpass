import { Favorite } from '@domain/entities/favorite';
import { CharacterResource } from './character-resource';

export class FavoriteResource {
  static toHTTP(favorite: Favorite) {
    return {
      id: favorite.id.toString(),
      character: CharacterResource.toHTTP(favorite.character),
    };
  }
}
