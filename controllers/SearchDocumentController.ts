import express, { Request, Response } from 'express';
import User from '../db/schema';

interface RequestBodyType {
  _id: string;
}

const SearchDocumentController = async (req: Request, res: Response) => {
  try {
    const { _id }: RequestBodyType = req.body;
    const { document } = req.params;

    if (document) {
      const user = await User.findOne({ '_id': _id }).select('documents');
      const filteredDocument = user?.documents.filter((doc: any) =>
        doc.title.toLowerCase().includes(document.toLowerCase())
      );

      return res.json({ status: 'searched', filteredDocument });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
}

export default SearchDocumentController