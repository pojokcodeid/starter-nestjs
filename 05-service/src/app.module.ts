import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CobaModule } from './coba/coba.module';

@Module({
  imports: [CatsModule, CobaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
