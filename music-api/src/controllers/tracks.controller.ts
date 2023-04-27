import express, { Request, Response } from "express";
import Track from "@src/models/Track";
import { CreateTrackDto } from "@src/dto/CreateTrack.dto";

const controller = express.Router();

controller.get("/", async (req: Request, res: Response) => {
  try {
    if (req.query.album) {
      const album = req.query.album as string;
      const result = await Track.find({ album: album }).populate(
        "album",
        "title artist release-date"
      );
      if (result) {
        res.send(result);
      } else {
        res.sendStatus(400);
      }
    } else {
      const tracks = await Track.find();
      res.send(tracks);
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

controller.post("/", async (req: Request, res: Response) => {
  const { title, album, duration } = req.body as CreateTrackDto;
  const track = new CreateTrackDto(title, album, duration);
  const result = new Track(track);
  try {
    await result.save();
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});

export default controller;
