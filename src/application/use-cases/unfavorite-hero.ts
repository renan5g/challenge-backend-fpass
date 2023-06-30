import { FavoritesRepository } from '@application/repositories/favorites-repository';
import { Injectable } from '@nestjs/common';

interface UnfavoriteHeroInput {
  characterId: string;
}

type UnfavoriteHeroOutput = void;

@Injectable()
export class UnfavoriteHero {
  constructor(readonly favoritesRepository: FavoritesRepository) {}

  async execute({
    characterId,
  }: UnfavoriteHeroInput): Promise<UnfavoriteHeroOutput> {
    const favorite = await this.favoritesRepository.findByCharacterId(
      characterId
    );
    if (!favorite) {
      throw new Error('Hero is not favorited');
    }

    await this.favoritesRepository.delete(favorite);
  }
}
