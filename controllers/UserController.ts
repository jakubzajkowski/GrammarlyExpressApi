import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../db/schema';

const UserController = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
  
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_TOKEN as string);
      const userId = decodedToken?.user?._id;
  
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      const user = await User.findOne({ _id: userId });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error:', error);
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

export default UserController