import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { ServiceModule } from '@infra/services/service.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule, DatabaseModule, ServiceModule],
})
export class AppModule {}
