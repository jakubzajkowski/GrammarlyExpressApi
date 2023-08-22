import express, { Response, Request } from "express";
import RegisterController from "../controllers/RegisterController";
import LoginController from "../controllers/LoginController";
import {Auth} from "../middleware/Auth";
import UserController from "../controllers/UserController";


const router = express.Router();
 
router.get('/', function (req:Request, res:Response) {
    res.json({status:'xd'})
})
router.post('/register', RegisterController)
router.post('/login', LoginController)
router.get('/user',Auth,UserController)


export default router