import { Favorite } from '@domain/entities/favorite';
import { makeCharacter } from '@test/factories/character';
import { InMemoryFavoritesRepository } from '@test/repositories/in-memory-favorites-repository';
import { HasFavorited } from './has-favorited';

describe('Has Favorited', () => {
  it('should be able to return true when has favorited hero', async () => {
    const favoritesRepository = new InMemoryFavoritesRepository();
    const sut = new HasFavorited(favoritesRepository);

    const character = makeCharacter();

    await favoritesRepository.create(
      Favorite.create({
        character,
      })
    );

    const hasFavorited = await sut.execute({ characterId: character.id });

    expect(hasFavorited).toBe(true);
  });
});
