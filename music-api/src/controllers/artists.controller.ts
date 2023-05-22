import express, { Request, Response } from "express";
import Artist from "@src/models/Artist";
import { nanoid } from "nanoid";
import multer from "multer";
import path from "path";
import { artistPath } from "config";
import { CreateArtistDto } from "@src/dto/CreateArtist.dto";
import authMiddleware from "@src/middlewares/auth.middleware";
import { permitMiddleware } from "@src/middlewares/permit.middleware";
import { UserRole } from "@src/helpers/enums/UserRole.enum";

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

controller.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body as CreateArtistDto;
      let image = "";
      if (req.file) {
        image = req.file.filename;
      }
      const artist = new CreateArtistDto(title, image, description);
      const result = new Artist(artist);
      await result.save();
      res.send(result);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

controller.put(
  "/:id/publish",
  [authMiddleware, permitMiddleware(UserRole.Admin)],
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log(id)
      if (id) {
        const result = await Artist.findOneAndUpdate({
          _id: id,
          published: true,
        });
        if (result) {
          await result.save();
          res.send(result);
        } else {
          return res.status(400).send({error: 'no such artist'});
        }
      } else {
        return res.status(400).send({error: 'wrong id'});
      }
    } catch (e) {
      res.status(400).send(e);
      console.log(e)
    }
  }
);

export default controller;
