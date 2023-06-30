import { UniqueEntityID } from '@core/entities';
import { Character } from '@domain/entities/character';
import { Favorite } from '@domain/entities/favorite';
import { Favorite as RawFavorite } from '@prisma/client';

export class PrismaFavoriteMapper {
  static toPrisma(model: Favorite) {
    return {
      id: model.id.toString(),
      character_id: model.character.id,
      character_name: model.character.name,
      character_description: model.character.description,
      character_thumbnail: model.character.thumbnail,
      createdAt: model.createdAt,
    };
  }

  static toDomain(raw: RawFavorite): Favorite {
    return Favorite.create(
      {
        character: Character.create({
          id: raw.character_id,
          name: raw.character_name,
          description: raw.character_description ?? '',
          thumbnail: raw.character_thumbnail ?? '',
        }),
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id)
    );
  }
}
