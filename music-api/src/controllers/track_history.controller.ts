import { Router, Request, Response } from "express";
import Track_History from "@src/models/Track_History";
import User from "../models/User";
import { CreateTrackHistoryDto } from "@src/dto/CreateTrackHistory.dto";

const controller = Router();

controller.post('/', async (req: Request, res: Response) => {
    const token = req.get('Authorization');
    
    if(!token) {
        return res.status(401).send({error: 'No token presented'})
    }
    const user = await User.findOne({token})
    
    if(!user) {
        return res.status(401).send({error: 'Wrong token!'})
    }
    const track = req.body.id as string;
    
    const trackHistory = new CreateTrackHistoryDto(user.id, track);
    const newTrackHistory = new Track_History(trackHistory);
    try {
        await newTrackHistory.save();
        res.send(newTrackHistory)
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
})

export default controller;