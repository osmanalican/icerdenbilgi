import type { Request, Response } from 'express';
import { syncUserService } from './auth.service';


export async function syncUserController(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      message: 'Yetkisiz işlem.',
    });
  }

  if (!req.user.email) {
    return res.status(400).json({
      message: 'Email bilgisi bulunamadı.',
    });
  }

  const user = await syncUserService({
    firebaseUid: req.user.uid,
    email: req.user.email,
    name: req.user.name,
    avatarUrl: req.user.picture,
  });

  return res.status(200).json({
    user,
  });
}