import marvelConfig from '@infra/config/marvel.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HerosService } from './contracts/heros.interface';
import { MarvelGatewayAdapter } from './marvel/marvel.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [marvelConfig],
    }),
  ],
  providers: [
    {
      provide: HerosService,
      useClass: MarvelGatewayAdapter,
    },
  ],
  exports: [
    {
      provide: HerosService,
      useClass: MarvelGatewayAdapter,
    },
  ],
})
export class ServiceModule {}
