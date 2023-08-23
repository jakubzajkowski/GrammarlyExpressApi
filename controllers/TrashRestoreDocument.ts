import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../db/schema';

interface RequestBodyType {
  _id: string;
  documentId: string;
}


const TrashRestoreDocument = async (req: Request, res: Response) => {
  try {
    const { _id, documentId }: RequestBodyType = req.body

    const user = await User.findOne({ _id, 'trashs._id': documentId }, { 'trashs.$': 1 });
    const trash: any = user?.trashs[0]

    await User.findOneAndUpdate(
      { _id },
      { $pull: { trashs: { _id: documentId } } }
    );

    await User.findOneAndUpdate(
      { _id },
      {
        $push: {
          documents: {
            _id: trash._id,
            title: trash.title,
            text: trash.text,
            status: trash.status,
            language: trash.language,
          },
        },
      }
    );

    return res.json({ status: 'restored' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
}

export default TrashRestoreDocument