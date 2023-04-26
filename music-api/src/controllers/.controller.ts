import express, {Request, Response} from 'express';

const controller = express.Router();


controller.get('/', async (req: Request, res: Response) => {
  try {
  } catch(e) {
    res.sendStatus(500);
  }
});

controller.post('/', async (req: Request, res: Response) => {
  
  try {
  } catch (e) {
    res.status(400).send(e);
  }
});

export default controller;
