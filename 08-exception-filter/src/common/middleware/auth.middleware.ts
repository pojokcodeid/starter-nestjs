// src/common/middleware/auth.middleware.ts
// ✅ Konsep: FUNCTIONAL MIDDLEWARE (dari dokumentasi resmi)
// Middleware sederhana berbentuk fungsi biasa (tanpa class & @Injectable)
// Gunakan ini jika middleware tidak butuh dependency injection

import { Request, Response, NextFunction } from 'express';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers['x-auth-token'];

  if (!token) {
    console.log('[authMiddleware] ⚠️  Tidak ada token, akses ditolak');
    return res
      .status(401)
      .json({ message: 'Unauthorized: Token tidak ditemukan' });
  }

  console.log(`[authMiddleware] ✅ Token ditemukan: ${String(token)}`);
  next();
}
