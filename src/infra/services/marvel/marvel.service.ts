import { Character } from '@domain/entities/character';
import marvelConfig from '@infra/config/marvel.config';
import {
  BadGatewayException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import axios, { HttpStatusCode, isAxiosError } from 'axios';
import { createHash } from 'node:crypto';
import {
  GetCharactersParams,
  HerosService,
  PaginationResult,
} from '../contracts/heros.interface';
import { MarvelHeroMapper } from './mappers/marvel-hero-mapper';
import { GetCharactersResponse } from './types';

@Injectable()
export class MarvelGatewayAdapter implements HerosService {
  constructor(
    @Inject(marvelConfig.KEY)
    private readonly marvelConf: ConfigType<typeof marvelConfig>
  ) {}

  private generateAuthorizationString() {
    const ts = new Date().getTime().toString();
    const hash = createHash('md5')
      .update(ts + this.marvelConf.private_key + this.marvelConf.public_key)
      .digest('hex');

    return `ts=${ts}&apikey=${this.marvelConf.public_key}&hash=${hash}`;
  }

  async getCharacters({
    q = '',
    page = 1,
    perPage = 20,
  }: GetCharactersParams): Promise<PaginationResult<Character>> {
    try {
      const offset = (page - 1) * perPage;

      let url = `/characters?offset=${offset}&limit=${perPage}&${this.generateAuthorizationString()}`;

      if (q) {
        url += `&nameStartsWith=${encodeURIComponent(q)}`;
      }

      const { data } = await axios.get<GetCharactersResponse>(url, {
        baseURL: this.marvelConf.base_url,
      });

      if (!data.data || data.status !== this.marvelConf.status_ok_response) {
        throw new Error('Marvel API Error');
      }

      const total_page = data.data.total / perPage;
      const per_page = data.data.limit;
      const next_page = total_page > page + 1 ? page + 1 : null;
      const prev_page = page === 1 ? null : page - 1;

      return {
        data: data.data.results.map((character) =>
          MarvelHeroMapper.toDomain(character)
        ),
        meta: {
          page,
          per_page,
          count: data.data.total,
          prev_page,
          next_page,
        },
      };
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getCharacterDetails(characterId: string): Promise<Character | null> {
    try {
      const { data } = await axios.get<GetCharactersResponse>(
        `/characters/${characterId}?${this.generateAuthorizationString()}`,
        {
          baseURL: this.marvelConf.base_url,
        }
      );

      if (!data.data || data.status !== this.marvelConf.status_ok_response) {
        throw new Error('Marvel API Error');
      }

      if (data.data.results.length === 0) {
        return null;
      }

      return MarvelHeroMapper.toDomain(data.data.results[0]);
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === HttpStatusCode.NotFound
      ) {
        throw new NotFoundException('Character not found');
      }

      throw new BadGatewayException('Marvel API Error');
    }
  }
}
