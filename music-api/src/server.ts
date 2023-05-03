import express from "express";
import logger from "jet-logger/lib";
import cors from "cors";
import mongoose from "mongoose";
import process from "process";
import artistsController from '@src/controllers/artists.controller';
import albumController from '@src/controllers/albums.controller';
import trackController from '@src/controllers/tracks.controller';
import userAuthController from '@src/controllers/auth.controller';

const app = express();
const PORT = 8000;

const run = async () => {
  await mongoose.connect('mongodb://localhost/music-api')

  app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

// Middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

// Controllers
app.use('/artists', artistsController);
app.use('/albums', albumController);
app.use('/tracks', trackController);
app.use('/auth', userAuthController);

run().catch((e) => logger.err(e)); 
