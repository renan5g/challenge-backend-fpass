import { FavoritesRepository } from '@application/repositories/favorites-repository';
import { PaginationParams } from '@core/repositories/pagination-params';
import { Favorite } from '@domain/entities/favorite';
import { Injectable } from '@nestjs/common';
import { PrismaFavoriteMapper } from '../mappers/prisma-favorite-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaFavoritesRepository implements FavoritesRepository {
  constructor(private prisma: PrismaService) {}

  async findByCharacterId(characterId: string): Promise<Favorite | null> {
    const favorite = await this.prisma.favorite.findFirst({
      where: {
        character_id: characterId,
      },
    });

    if (!favorite) {
      return null;
    }

    return PrismaFavoriteMapper.toDomain(favorite);
  }

  async findMany(params: PaginationParams): Promise<Favorite[]> {
    const favorites = await this.prisma.favorite.findMany();
    return favorites.map(PrismaFavoriteMapper.toDomain);
  }

  async create(favorite: Favorite): Promise<void> {
    const raw = PrismaFavoriteMapper.toPrisma(favorite);

    await this.prisma.favorite.create({
      data: raw,
    });
  }

  async save(favorite: Favorite): Promise<void> {
    const raw = PrismaFavoriteMapper.toPrisma(favorite);

    await this.prisma.favorite.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async delete(favorite: Favorite): Promise<void> {
    await this.prisma.favorite.delete({
      where: {
        id: favorite.id.toString(),
      },
    });
  }
}
