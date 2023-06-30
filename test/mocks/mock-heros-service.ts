import { Character } from '@domain/entities/character';
import {
  GetCharactersParams,
  HerosService,
  PaginationResult,
} from '@infra/services/contracts/heros.interface';
import { makeCharacter } from '@test/factories/character';

export class HerosServiceMock implements HerosService {
  async getCharacters(
    params: GetCharactersParams
  ): Promise<PaginationResult<Character>> {
    return {
      data: [
        makeCharacter(),
        makeCharacter(),
        makeCharacter(),
        makeCharacter(),
        makeCharacter(),
      ],
      meta: {
        count: 1,
        page: 1,
        per_page: 10,
        next_page: null,
        prev_page: null,
      },
    };
  }

  async getCharacterDetails(characterId: string): Promise<Character | null> {
    return makeCharacter({
      id: characterId,
    });
  }
}
