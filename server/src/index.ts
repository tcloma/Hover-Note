import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import EventEmitter from 'events';
import { readFile } from 'fs/promises';
import dotenv from 'dotenv';
import cors from 'cors';
import { UserModel } from './models/Users';

dotenv.config();
mongoose.connect(
   'mongodb+srv://tcloma:pjgtv42mgWJN5GGJ@cluster0.eutou2f.mongodb.net/mern-server-test?retryWrites=true&w=majority'
);

const app: Application = express();
const eventEmitter: EventEmitter = new EventEmitter();
const port = process.env.PORT;

eventEmitter.on('load', () => {
   console.log('Page loaded 😎');
});

app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req: Request, res: Response): void => {
   res.json({ message: 'Express + TS Servers' });
   eventEmitter.emit('load');
});

app.get('/text', async (req: Request, res: Response) => {
   res.send(await readFile('./hello.txt', 'utf-8'));
   eventEmitter.emit('load');
});

app.get('/users', (req: Request, res: Response): void => {
   // Get ALL users in the database
   UserModel.find({}, (err: Error, result: any) => {
      if (err) {
         res.json(err);
      } else {
         res.json(result);
      }
   });
});

app.post('/users', async (req: Request, res: Response): Promise<void> => {
   const user = req.body;
   const newUser = new UserModel(user);
   await newUser.save();

   res.json(user);
});

// Server startup
app.listen(port, (): void => {
   console.log(`Server is running on port ${port}`);
});
