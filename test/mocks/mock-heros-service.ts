import { Character } from '@domain/entities/character';
import {
  GetCharactersParams,
  HerosService,
} from '@infra/services/contracts/heros.interface';
import { makeCharacter } from '@test/factories/character';

export class HerosServiceMock implements HerosService {
  async getCharacters(params: GetCharactersParams): Promise<Character[]> {
    return [
      makeCharacter(),
      makeCharacter(),
      makeCharacter(),
      makeCharacter(),
      makeCharacter(),
    ];
  }

  async getCharacterDetails(characterId: string): Promise<Character | null> {
    return makeCharacter({
      id: characterId,
    });
  }
}
