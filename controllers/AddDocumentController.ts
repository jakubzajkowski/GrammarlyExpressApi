import express, { Request, Response } from 'express';
import User from '../db/schema';

interface RequestBodyType {
    _id: string;
  }
interface documentIdType {
    _id?: string
    date: Date;
    text?: string | undefined;
    title?: string | undefined;
    status?: string | undefined;
    language?: string | undefined;
}

const AddDocumentController= async (req: Request, res: Response) => {
    try {
      const { _id }: RequestBodyType = req.body;
      
      await User.findOneAndUpdate(
        { _id: _id },
        {
          $push: {
            documents: {
              title: 'Untitled Document',
              text: '',
              status: 'created',
              language: 'American English',
            },
          },
        }
      );
  
      const document = await User.find({ _id }).select('documents');
      const documentId:documentIdType = document[0].documents[document[0].documents.length - 1];
      
      return res.json({ status: 'added',documentId: documentId._id, _id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  }

export default AddDocumentController