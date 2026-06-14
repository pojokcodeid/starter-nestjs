import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';
import { HttpExceptionFilter } from 'custom-exception/httpfilter.exception';

// example global middleware
function globalLogger(req: Request, res: Response, next: NextFunction) {
  console.log(
    `\n[GlobalMiddleware] ▶ Incoming Request: ${req.method} ${req.url}`,
  );
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // mengunakan global middleware
  app.use(globalLogger);

  // set global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
