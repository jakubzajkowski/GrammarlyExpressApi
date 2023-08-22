import express, { Request, Response } from 'express';
import User from '../db/schema';


interface RequestBodyType {
    _id: string;
    documentId: string;
  }
interface DeletedDocumentType {
    _id? : string | undefined
    date: Date;
    text?: string | undefined;
    title?: string | undefined;
    status?: string | undefined;
    language?: string | undefined;
}


const DeleteDocumentController = async (req: Request, res: Response) => {
    try {
      const { _id, documentId }: RequestBodyType = req.body;
  
      const user = await User.findOne(
        { _id, 'documents._id': documentId },
        { 'documents.$': 1 }
      );
  
      if (user) {
        await User.findOneAndUpdate(
          { _id },
          { $pull: { documents: { _id: documentId } } }
        );
  
        const deletedDocument:DeletedDocumentType = user.documents[0];
        
        await User.findOneAndUpdate(
          { _id },
          {
            $push: {
              trashs: {
                _id: deletedDocument._id,
                title: deletedDocument.title,
                text: deletedDocument.text,
                status: deletedDocument.status,
                language: deletedDocument.language,
              },
            },
          }
        );
  
        return res.json({ status: 'deleted' });
      } else {
        return res.status(404).json({ error: 'Document not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  }
export default DeleteDocumentController