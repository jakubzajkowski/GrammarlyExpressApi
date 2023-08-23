import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../db/schema';


interface RequestBodyType {
  _id: string;
  documentId: string;
}


const TrashDeleteDocument = async (req: Request, res: Response) => {
  try {
    const { _id, documentId }: RequestBodyType = req.body;

    await User.findOneAndUpdate(
      { _id },
      { $pull: { trashs: { _id: documentId } } }
    );

    return res.json({ status: 'deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
}

export default TrashDeleteDocument
