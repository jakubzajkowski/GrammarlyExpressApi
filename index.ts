import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes/routes';
import bodyParser = require('body-parser');
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://127.0.0.1:3000',
  credentials: true, 
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());

app.use('/',router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});