import { Character } from '@domain/entities/character';
import axios from 'axios';
import { createHash } from 'node:crypto';
import {
  GetCharactersParams,
  HerosService,
} from '../contracts/heros.interface';
import { MarvelHeroMapper } from './mappers/marvel-hero-mapper';
import { GetCharactersResponse } from './types';

export class MarvelGatewayAdapter implements HerosService {
  MARVEL_GATEWAY_BASE_URL = 'https://gateway.marvel.com/v1/public/';
  MARVEL_GATEWAY_API_KEY = '';
  MARVEL_GATEWAY_PUBLIC_KEY = '';
  MARVEL_GATEWAY_PRIVATE_KEY = '';
  MARVEL_GATEWAY_OK_STATUS = 'Ok';

  private generateHash(ts: string) {
    const hash = createHash('md5')
      .update(
        ts + this.MARVEL_GATEWAY_PRIVATE_KEY + this.MARVEL_GATEWAY_PUBLIC_KEY
      )
      .digest('hex');

    return hash;
  }

  private generateAuthorizationString() {
    const ts = new Date().getTime().toString();
    const hash = this.generateHash(ts);

    return `apikey=${this.MARVEL_GATEWAY_API_KEY}&ts=${ts}&hash=${hash}`;
  }

  async getCharacters({
    q = '',
    page = 1,
    perPage = 20,
  }: GetCharactersParams): Promise<Character[]> {
    const offset = (page - 1) * perPage;

    const { data } = await axios.get<GetCharactersResponse>(
      `characters?nameStartsWith=${q}&offset=${offset}&limit=${perPage}&${this.generateAuthorizationString()}`,
      {
        baseURL: this.MARVEL_GATEWAY_BASE_URL,
      }
    );

    if (!data.data || data.status !== this.MARVEL_GATEWAY_OK_STATUS) {
      throw new Error('Marvel API Error');
    }

    return data.data.results.map((character) =>
      MarvelHeroMapper.toDomain(character)
    );
  }

  async getCharacterDetails(characterId: string): Promise<Character | null> {
    const { data } = await axios.get<GetCharactersResponse>(
      `characters/${characterId}?${this.generateAuthorizationString()}`,
      {
        baseURL: this.MARVEL_GATEWAY_BASE_URL,
      }
    );

    if (!data.data || data.status !== this.MARVEL_GATEWAY_OK_STATUS) {
      throw new Error('Marvel API Error');
    }

    if (data.data.results.length === 0) {
      return null;
    }

    return MarvelHeroMapper.toDomain(data.data.results[0]);
  }
}
