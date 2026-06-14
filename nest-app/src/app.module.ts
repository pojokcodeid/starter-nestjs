import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { TestModule } from './test/test.module';
import { LoggerMiddleware } from 'common/middeware/logger.middleware';
import { authMiddleware } from 'common/middeware/auth.middleware';
import { CatsController } from 'cats/cats.controller';

@Module({
  imports: [CatsModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, authMiddleware)
      .exclude({ path: 'cats', method: RequestMethod.POST })
      .forRoutes(CatsController);
  }
}
