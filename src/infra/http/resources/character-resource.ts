import { Character } from '@domain/entities/character';

export class CharacterResource {
  static toHTTP(model: Character) {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
      thumbnail: model.thumbnail,
    };
  }
}
