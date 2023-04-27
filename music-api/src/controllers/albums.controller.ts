import express, { Request, Response } from "express";
import Album from "@src/models/Album";
import { nanoid } from "nanoid";
import multer from "multer";
import path from "path";
import { albumPath } from "config";
import { CreateAlbumDto } from "@src/dto/CreateAlbum.dto";

const controller = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, albumPath);
  },
  filename(req, file, cb) {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

controller.get("/", async (req: Request, res: Response) => {
  try {
    if (req.query.artist) {
      const artist = req.query.artist as string;
      const result = await Album.find({ artist: artist });
      if (result) {
        res.send(result);
      } else {
        res.sendStatus(400);
      }
    } else {
      const artists = await Album.find();
      res.send(artists);
    }
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
});

controller.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Album.findById(id).populate(
      "artist",
      "title description image"
    );
    if (result) {
      res.send(result);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

controller.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const { title, artist, release_date } = req.body as CreateAlbumDto;
      let image = "";
      if (req.file) {
        image = req.file.filename;
      }
      const newArtist = new CreateAlbumDto(title, artist, release_date, image);
      const result = new Album(newArtist);
      await result.save();
      res.send(result);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

export default controller;
