import { FavoritesRepository } from '@application/repositories/favorites-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaFavoritesRepository } from './prisma/repositories/prisma-favorites-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: FavoritesRepository,
      useClass: PrismaFavoritesRepository,
    },
  ],
  exports: [
    {
      provide: FavoritesRepository,
      useClass: PrismaFavoritesRepository,
    },
  ],
})
export class DatabaseModule {}
