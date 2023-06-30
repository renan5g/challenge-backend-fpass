import { FavoritesRepository } from '@application/repositories/favorites-repository';
import { Injectable } from '@nestjs/common';

interface HasFavoritedInput {
  characterId: string;
}

type HasFavoritedOutput = boolean;

@Injectable()
export class HasFavorited {
  constructor(readonly favoritesRepository: FavoritesRepository) {}

  async execute({
    characterId,
  }: HasFavoritedInput): Promise<HasFavoritedOutput> {
    const favorite = await this.favoritesRepository.findByCharacterId(
      characterId
    );
    return !!favorite;
  }
}
