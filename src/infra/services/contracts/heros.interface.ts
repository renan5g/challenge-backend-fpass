import { Character } from '@domain/entities/character';

export type GetCharactersParams = {
  q?: string;
  page?: number;
  perPage?: number;
};

export abstract class HerosService {
  abstract getCharacters(params: GetCharactersParams): Promise<Character[]>;
  abstract getCharacterDetails(characterId: string): Promise<Character | null>;
}
