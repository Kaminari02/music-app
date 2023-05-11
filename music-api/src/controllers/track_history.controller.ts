import { Router, Request, Response } from "express";
import Track_History from "@src/models/Track_History";
import User from "../models/User";
import { CreateTrackHistoryDto } from "@src/dto/CreateTrackHistory.dto";

const controller = Router();

controller.get("/", async (req: Request, res: Response) => {
    try {
        const token = req.get('Authorization');
        if(!token) {
            return res.status(401).send({error: 'No token presented'})
        }
        const user = await User.findOne({token})
        
        if(!user) {
            return res.status(401).send({error: 'Wrong token!'})
        }
        const result = (await Track_History.aggregate([
            {
            $lookup: {
                from: 'tracks',
                localField: 'track',
                foreignField: '_id',
                as: 'track'
            }
        },
            {
                $lookup: {
                from: 'albums',
                localField: 'track.album',
                foreignField: '_id',
                as: 'album'
            }
        },
        {
            $lookup: {
                from: 'artists',
                localField: 'album.artist',
                foreignField: '_id',
                as: 'artist'
            }
        },
        {
            $match: {
                user: user._id,
            }
        },{
            $sort: {
                datetime: -1,
            }
        },
        ]));

        if (result) {
          res.send(result);
        } else {
          res.sendStatus(400);
        }
      
    } catch (e) {
      res.sendStatus(500);
    }
  });

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