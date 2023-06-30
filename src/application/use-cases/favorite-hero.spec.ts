import { HerosServiceMock } from '@test/mocks/mock-heros-service';
import { InMemoryFavoritesRepository } from '@test/repositories/in-memory-favorites-repository';
import { FavoriteHero } from './favorite-hero';

describe('Favorite Hero', () => {
  it('should be able to favorite a hero', async () => {
    const favoritesRepository = new InMemoryFavoritesRepository();
    const herosService = new HerosServiceMock();
    const sut = new FavoriteHero(favoritesRepository, herosService);

    await sut.execute({ characterId: 'test-hero-id' });

    expect(favoritesRepository.items).toHaveLength(1);
    expect(favoritesRepository.items[0].character.id).toEqual('test-hero-id');
  });
});
