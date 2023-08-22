import { Response, Request } from "express";
import bcrypt from 'bcrypt';
import User from '../db/schema';

interface RequestBodyType {
    password: string;
    name: string;
    email: string;
  }

const RegisterController =async (req: Request, res: Response) => {
    const { password, name, email }: RequestBodyType = req.body;
    try {
      const checkEmailDb = await User.findOne({ email: email });
      if (checkEmailDb) {
        return res.status(400).json({ error: 'Your Email is used' });
      } else {
        const hash = bcrypt.hashSync(password, 10);
        const user = new User({ password: hash, name: name, email: email, plan: 'free', prompts: 0 });
        await user.save();
        return res.status(201).json({ status: 'success' });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export default RegisterController