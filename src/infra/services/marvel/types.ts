export type MarvelCharacter = {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

export type BaseResponse<T> = {
  code: number;
  status: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    results: T[];
  };
};

export type GetCharactersResponse = BaseResponse<MarvelCharacter>;
