import { Module } from '@nestjs/common';

import * as UseCases from '@application/use-cases';
import { DatabaseModule } from '@infra/database/database.module';
import { ServiceModule } from '@infra/services/service.module';
import * as Controllers from './controllers';

@Module({
  imports: [DatabaseModule, ServiceModule],
  controllers: [...Object.values(Controllers)],
  providers: [...Object.values(UseCases)],
})
export class HttpModule {}
