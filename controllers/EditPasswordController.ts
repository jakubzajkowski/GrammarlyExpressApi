import express, { Request, Response } from 'express';
import User from '../db/schema';
import bcrypt from 'bcrypt';

interface RequestBodyType {
    password: string;
    email: string;
    newPassword: string;
  }

const EditPasswordController=async (req: Request, res: Response) => {
    try {
      const { password, email, newPassword }: RequestBodyType = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ error: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password as string);
      if (!isMatch) {
        return res.json({ error: 'Invalid password' });
      }
  
      const hash = bcrypt.hashSync(newPassword, 10);
      await User.findOneAndUpdate({ email }, { password: hash });
  
      return res.json({ status: 'Password changed' });
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred' });
    }
  }
export default EditPasswordController