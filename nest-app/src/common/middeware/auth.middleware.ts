import { NextFunction, Request, Response } from 'express';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers['x-auth-token'];

  if (!token) {
    console.log('[AuthMiddleware] !!! tidak ada token, acess ditolak');
    return res.status(401).json({
      message: 'Unauthorized: Token tidak ditemukan',
    });
  }

  if (token != 'secret-token') {
    console.log('[AuthMiddleware] !!! token tidak valid, acess ditolak');
    return res.status(401).json({
      message: 'Unauthorized: Token tidak valid',
    });
  }

  console.log(
    `[AuthMiddleware] Token ditemukan, lanjutkan request ${String(token)}`,
  );
  next();
}
