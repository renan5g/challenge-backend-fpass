import { Favorite } from '@domain/entities/favorite';
import { makeCharacter } from '@test/factories/character';
import { InMemoryFavoritesRepository } from '@test/repositories/in-memory-favorites-repository';
import { UnfavoriteHero } from './unfavorite-hero';

describe('Unfavorite Hero', () => {
  it('should be able to favorite a hero', async () => {
    const favoritesRepository = new InMemoryFavoritesRepository();
    const sut = new UnfavoriteHero(favoritesRepository);

    const character = makeCharacter();

    await favoritesRepository.create(
      Favorite.create({
        character,
      })
    );

    await sut.execute({ characterId: character.id });

    expect(favoritesRepository.items).toHaveLength(0);
  });
});
