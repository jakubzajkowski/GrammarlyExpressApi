import express, { Request, Response } from 'express';
import User from '../db/schema';

interface RequestBodyType {
    _id: string;
    documentId: string;
    language: string;
  }

const LanguageDocumentController = async (req: Request, res: Response) => {
    try {
      const { _id, documentId, language }: RequestBodyType = req.body;
  
      await User.updateOne(
        { _id, "documents._id": documentId },
        {
          $set: {
            "documents.$.language": language,
          },
        }
      );
        console.log(language)
      return res.json({ status: 'saved' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  }

export default LanguageDocumentController