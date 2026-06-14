import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response } from 'express';

function globalMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(
    `\n[Globalmiddleware] -> Imcoming request: ${req.method} ${req.url}`,
  );
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(globalMiddleware);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
