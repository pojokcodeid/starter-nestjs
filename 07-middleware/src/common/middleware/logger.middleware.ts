// src/common/middleware/logger.middleware.ts
// ✅ Konsep: CLASS-BASED MIDDLEWARE (dari dokumentasi resmi)
// Middleware berbentuk class yang mengimplementasikan NestMiddleware interface

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const timestamp = new Date().toISOString();

    console.log(`[LoggerMiddleware] ${timestamp} - ${method} ${originalUrl}`);

    // Wajib memanggil next() agar request diteruskan ke handler berikutnya
    next();
  }
}
