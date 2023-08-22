import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../db/schema';

interface RequestBodyType {
    password: string;
    email: string;
  }

const LoginController = async (req: Request, res: Response) => {
    try {
      const { password, email }: RequestBodyType = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password as string);
  
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      const token = jwt.sign({ user }, process.env.JWT_SECRET_TOKEN as string, {
        expiresIn: process.env.JWT_SECRET_TOKEN_EXPIRES as string,
      });
      res.cookie('token', token, {
        httpOnly: false,
        maxAge: parseInt(process.env.SESSION_EXPIRES as string),
        sameSite: 'strict',
        secure: true,
      });
  
      return res.status(200).send('Logged Successful');
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

export default LoginController