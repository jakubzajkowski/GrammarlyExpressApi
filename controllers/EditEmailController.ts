import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../db/schema';
import bcrypt from 'bcrypt';

interface RequestBodyType {
  password: string;
  email: string;
  newEmail: string;
}

const EditEmailController = async (req: Request, res: Response) => {
    try {
      const { password, email, newEmail }: RequestBodyType = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ error: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password as string);
      if (!isMatch) {
        return res.json({ error: 'Invalid password' });
      }
  
      const emailCheck = await User.findOne({ email: newEmail });
      if (emailCheck) {
        return res.json({ error: 'This email is used' });
      }
  
      await User.findOneAndUpdate({ email }, { email: newEmail });
  
      return res.json({ status: 'Email changed' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  }

export default EditEmailController