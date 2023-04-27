import express, { Request, Response } from "express";
import Artist from "@src/models/Artist";
import { nanoid } from "nanoid";
import multer from "multer";
import path from "path";
import { artistPath } from "config";
import { CreateArtistDto } from "@src/dto/CreateArtist.dto";

const controller = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, artistPath);
  },
  filename(req, file, cb) {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

controller.get("/", async (req: Request, res: Response) => {
  try {
    const artists = await Artist.find();
    res.send(artists);
  } catch (e) {
    res.sendStatus(500);
  }
});

controller.post("/", upload.single("image"), async (req: Request, res: Response) => {
    const { title, description } = req.body as CreateArtistDto;
    let image = "";
    if (req.file) {
      image = req.file.filename;
    }
    const artist = new CreateArtistDto(title, image, description)
    const result = new Artist(artist);
    await result.save();
    res.send(result);
    try {
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

export default controller;
