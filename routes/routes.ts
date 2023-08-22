import express, { Response, Request } from "express";
import RegisterController from "../controllers/RegisterController";
import LoginController from "../controllers/LoginController";
import {Auth} from "../middleware/Auth";
import UserController from "../controllers/UserController";
import AddDocumentController from "../controllers/AddDocumentController";
import DeleteDocumentController from "../controllers/DeleteDocumentController";
import DocumentController from "../controllers/DocumentController";
import EditEmailController from "../controllers/EditEmailController";


const router = express.Router();
 
router.get('/', function (req:Request, res:Response) {
    res.json({status:'xd'})
})
router.post('/register', RegisterController)
router.post('/login', LoginController)
router.get('/user',Auth,UserController)
router.post('/add-document',AddDocumentController)
router.post('/delete-document',DeleteDocumentController)
router.get('/document/:_id/:document_id',DocumentController)

router.post('/edit-email',EditEmailController)


export default router