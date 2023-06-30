import { Character } from '@domain/entities/character';

export type GetCharactersParams = {
  q?: string;
  page?: number;
  perPage?: number;
};

export type PaginationResult<T = any> = {
  data: T[];
  meta: {
    page: number;
    per_page: number;
    count: number;
    prev_page?: number | null;
    next_page?: number | null;
  };
};

export abstract class HerosService {
  abstract getCharacters(
    params: GetCharactersParams
  ): Promise<PaginationResult<Character>>;
  abstract getCharacterDetails(characterId: string): Promise<Character | null>;
}
