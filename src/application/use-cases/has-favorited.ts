import { FavoritesRepository } from '@application/repositories/favorites-repository';

interface HasFavoritedInput {
  characterId: string;
}

type HasFavoritedOutput = boolean;

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
