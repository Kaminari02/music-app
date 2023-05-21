import express, { Request, Response } from "express";
import Album from "@src/models/Album";
import { nanoid } from "nanoid";
import multer from "multer";
import path from "path";
import { albumPath } from "config";
import { CreateAlbumDto } from "@src/dto/CreateAlbum.dto";
import Track from "@src/models/Track";
import Artist from "@src/models/Artist";


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
      const result = (await Album.find({ artist: artist }).populate('artist').sort({release_date: 1}));
      result.forEach(async album => {
        const result = await Track.countDocuments({album: album})
        console.log(result)
      })
      if (result) {
        res.send(result);
      } else {
        res.sendStatus(400);
      }
    } else {
      const albums = await Album.find();
      res.send(albums);
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
      const artistId = await Artist.findOne({title: artist}).exec()
      let image = "";
      if (req.file) {
        image = req.file.filename;
      }
      if(artistId) {
        const newAlbum = new CreateAlbumDto(title, artistId.id, release_date, image);
        const result = new Album(newAlbum);
        await result.save();
        res.send(result);
      } else {
        res.status(404).send({error: 'No such artist presented'});
      } 
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

export default controller;
