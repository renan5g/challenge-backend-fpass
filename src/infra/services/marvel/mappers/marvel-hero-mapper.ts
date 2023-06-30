import { Character } from '@domain/entities/character';
import { MarvelCharacter } from '../types';

type Raw = MarvelCharacter;

export class MarvelHeroMapper {
  static toDomain(raw: Raw): Character {
    return Character.create({
      id: raw.id.toString(),
      name: raw.name,
      description: raw.description,
      thumbnail: `${raw.thumbnail.path}.${raw.thumbnail.extension}`,
    });
  }
}
