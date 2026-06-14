import { Module } from '@nestjs/common';
import { CobaService } from './coba.service';
import { CobaController } from './coba.controller';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [CobaController],
  providers: [CobaService],
})
export class CobaModule {}
