import { Router, Request, Response } from "express";
import { nanoid } from "nanoid";
import User from "@src/models/User";
import { AuthCredentialsDto } from "@src/dto/AuthCredentials.dto";

const controller = Router();

controller.post('/signup', async (req: Request, res: Response) => {
    const user = new User(req.body as AuthCredentialsDto);
    user.generateToken();
    try {
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

export default controller;