import express, { Request, Response } from 'express';
import User from '../db/schema';

interface RequestBodyType {
    _id: string;
    documentId: string;
    title: string;
    text: string;
  }

const SaveDocumentController = async (req: Request, res: Response) => {
    try {
      const { _id, documentId, title, text }: RequestBodyType = req.body;
  
      await User.updateOne(
        { _id, "documents._id": documentId },
        {
          $set: {
            "documents.$.text": text,
            "documents.$.title": title,
            "documents.$.status": 'Work',
          },
        }
      );
  
      return res.json({ status: 'saved' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  }

  export default SaveDocumentController