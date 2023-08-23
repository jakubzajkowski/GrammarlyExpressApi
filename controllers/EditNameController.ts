import express, { Request, Response } from 'express';
import User from '../db/schema';

interface RequestBodyType {
    newName: string;
    email: string;
  }

const EditNameController = async (req: Request, res: Response) => {
    try {
      const { email, newName }: RequestBodyType = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ error: 'User not found' });
      }
  
      await User.findOneAndUpdate({ email }, { name: newName });
  
      return res.json({ status: 'Name changed' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  }

export default EditNameController