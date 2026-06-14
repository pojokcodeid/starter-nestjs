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
import { LoggerMiddleware } from 'common/middleware/logger.middleware';
import { authMiddleware } from 'common/middleware/auth.middleware';
import { CatsController } from 'cats/cats.controller';

@Module({
  imports: [CatsModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // ✅ MULTIPLE MIDDLEWARE: apply() menerima lebih dari satu middleware sekaligus
    // ✅ EXCLUDING ROUTES: POST /cats dikecualikan dari LoggerMiddleware
    // ✅ forRoutes(Controller): middleware diterapkan ke semua route di CatsController
    consumer
      .apply(LoggerMiddleware, authMiddleware) // multiple middleware, dijalankan berurutan
      .exclude(
        { path: 'cats', method: RequestMethod.POST }, // ✅ exclude POST /cats
      )
      .forRoutes(CatsController); // ✅ targetkan CatsController
  }
}
