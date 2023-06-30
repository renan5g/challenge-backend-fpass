import { Favorite } from '@domain/entities/favorite';
import { makeCharacter } from '@test/factories/character';
import { InMemoryFavoritesRepository } from '@test/repositories/in-memory-favorites-repository';
import { ListFavorites } from './list-favorites';

describe('List Favorites', () => {
  it('should be able to list favorites', async () => {
    const favoritesRepository = new InMemoryFavoritesRepository();
    const sut = new ListFavorites(favoritesRepository);

    await favoritesRepository.create(
      Favorite.create({
        character: makeCharacter({ id: 'character-1' }),
      })
    );

    await favoritesRepository.create(
      Favorite.create({
        character: makeCharacter({ id: 'character-2' }),
      })
    );

    await favoritesRepository.create(
      Favorite.create({
        character: makeCharacter({ id: 'character-3' }),
      })
    );

    const { favorites } = await sut.execute({ page: 1 });

    expect(favorites).toHaveLength(3);
  });
});
