import express, { Request, Response } from 'express';
import User from '../db/schema';

const DocumentController = async (req: Request, res: Response) => {
    try {
      const params = req.params;
  
      if (params._id && params.document_id) {
        const user = await User.find(
          { '_id': params._id, 'documents._id': params.document_id },
          { 'documents.$': 1 }
        );
  
        if (user[0]?.documents[0]) {
          return res.json(user[0].documents[0]);
        } else {
          return res.status(404).json({ error: 'Document not found' });
        }
      } else {
        return res.json({ error: 'Not logged' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  }

export default DocumentController