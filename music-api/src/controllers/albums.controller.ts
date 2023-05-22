import express, { Request, Response } from "express";
import Album from "@src/models/Album";
import { nanoid } from "nanoid";
import multer from "multer";
import path from "path";
import { albumPath } from "config";
import { CreateAlbumDto } from "@src/dto/CreateAlbum.dto";
import Track from "@src/models/Track";
import Artist from "@src/models/Artist";
import authMiddleware from "@src/middlewares/auth.middleware";
import { permitMiddleware } from "@src/middlewares/permit.middleware";
import { UserRole } from "@src/helpers/enums/UserRole.enum";

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
      const newAlbum = new CreateAlbumDto(title, artist, release_date, image);
      const result = new Album(newAlbum);
      await result.save();
      res.send(result);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

controller.get("/", async (req: Request, res: Response) => {
  try {
    if (req.query.artist) {
      const artist = req.query.artist as string;
      const result = await Album.find({ artist: artist })
        .populate("artist")
        .sort({ release_date: 1 });
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

controller.put(
  "/:id/publish",
  [authMiddleware, permitMiddleware(UserRole.Admin)],
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (id) {
        const result = await Album.findOneAndUpdate(
          { _id: id },
          { $set: { published: true } }
        );
        if (result) {
          await result.save();
          res.send(result);
        } else {
          return res.status(404).send({ error: "no such album" });
        }
      } else {
        return res.status(400).send({ error: "wrong id" });
      }
    } catch (e) {
      res.status(400).send(e);
      console.log(e);
    }
  }
);

controller.delete(
  "/:id",
  [authMiddleware, permitMiddleware(UserRole.Admin)],
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const reqAlbum = await Album.findByIdAndRemove(id);

      if (reqAlbum) {
        const responceTrack = await Track.deleteMany({ album: id });
        res.send(responceTrack);
      }
    } catch (error) {
      res.status(404).send("Error");
    }
  }
);

export default controller;
