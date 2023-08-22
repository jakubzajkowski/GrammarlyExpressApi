import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const Auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
    try {
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      } else {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN as string);
        if (decodedToken) {
          return next();
        } else {
          return res.status(401).json({ error: 'Unauthorized' });
        }
      }
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }