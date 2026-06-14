import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { CatsModule } from 'cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
