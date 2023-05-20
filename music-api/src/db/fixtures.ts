import mongoose from "mongoose";
import Artist from "../models/Artist";
import Album from "../models/Album";
import Track from "../models/Track";
import User from "../models/User";
import Track_History from "../models/Track_History";
import {nanoid} from 'nanoid';
import {UserRole} from '../helpers/enums/UserRole.enum';

mongoose.connect("mongodb://localhost/music-api");

const db = mongoose.connection;

db.once("open", async () => {
  try {
    await db.dropCollection("artists");
    await db.dropCollection("albums");
    await db.dropCollection("tracks");
    await db.dropCollection("track_histories");
    await db.dropCollection("users");
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }

  const [museArtist, mgmtArtist] = await Artist.create(
    {
      title: "Muse",
      description: "Rock band from England",
      image: "muse.jpg",
    },
    {
      title: "MGMT",
      description: "indie rock band from US",
      image: "MGMT.webp",
    }
  );

  const [absolutionAlbum, congratulationAlbum, oracularAlbum] =
    await Album.create(
      {
        title: "Absolution",
        artist: museArtist._id,
        image: "absolution.jpg",
        release_date: "2003",
      },
      {
        title: "Congratulations",
        artist: mgmtArtist._id,
        image: "Congratulations.png",
        release_date: "2010",
      },
      {
        title: "Oracular Spectacular",
        artist: mgmtArtist._id,
        image: "mgmtAlbum.jpg",
        release_date: "2007",
      }
    );

  const [kidsTrack, PretendTrack, weekendTrack, electricTrack, piecesTrack] = await Track.create(
    {
      title: "Kids",
      album: oracularAlbum._id,
      duration: "5:03",
      track_num: 1
    },
    {
      title: "Time to Pretend",
      album: oracularAlbum._id,
      duration: "4:21",
      track_num: 2
    },
    {
      title: "Weekend Wars",
      album: oracularAlbum._id,
      duration: "4:10",
      track_num: 3
    },
    {
      title: "Electric Feel",
      album: oracularAlbum._id,
      duration: "3:49",
      track_num: 4
    },
    {
      title: "Pieces of What",
      album: oracularAlbum._id,
      duration: "2:49",
      track_num: 5
    }
  );

  const [absolutionTrack, blackoutTrack, timeIsTrack, stockholmTrack, hysteriaTrack] = await Track.create(
    {
      title: "Sing for Absolution",
      album: absolutionAlbum._id,
      duration: "4:55",
      track_num: 1
    },
    {
      title: "Blackout",
      album: absolutionAlbum._id,
      duration: "4:23",
      track_num: 2
    },
    {
      title: "Time is Running Out",
      album: absolutionAlbum._id,
      duration: "3:57",
      track_num: 3
    },
    {
      title: "Stockholm Syndrome",
      album: absolutionAlbum._id,
      duration: "4:57",
      track_num: 4
    },
    {
      title: "Hysteria",
      album: absolutionAlbum._id,
      duration: "3:47",
      track_num: 5
    }
  );

  const [deliriumTrack, congratsTrack, darkAgeTrack, tslampTrack, handItTrack] = await Track.create(
    {
      title: "Flash Delirium",
      album: congratulationAlbum._id,
      duration: "4:16",
      track_num: 1
    },
    {
      title: "Congratulations",
      album: congratulationAlbum._id,
      duration: "3:55",
      track_num: 2
    },
    {
      title: "Little Dark Age",
      album: congratulationAlbum._id,
      duration: "4:59",
      track_num: 3
    },
    {
      title: "TSLAMP",
      album: congratulationAlbum._id,
      duration: "4:30",
      track_num: 4
    },
    {
      title: "Hand it Over",
      album: congratulationAlbum._id,
      duration: "3:55",
      track_num: 5
    }
  );

  const [firstUser, secondUser] = await User.create(
    {
      username: "user",
      password: "123",
      token: nanoid(),
    },
    {
      username: "admin",
      password: "123",
      token: nanoid(),
      role: UserRole.Admin
    }
  );

  const [firstHistory, secondHistory] = await Track_History.create(
    {
      track: kidsTrack._id,
      user: firstUser._id,
      datetime: "2023-05-03T11:01:47.108+00:00",
    },
    {
      track: PretendTrack._id,
      user: secondUser._id,
      datetime: "2023-05-03T11:21:55.681+00:00",
    },
    {
      track: kidsTrack._id,
      user: secondUser._id,
      datetime: "2023-05-11T11:27:05.436+00:00",
    },
    {
      track: deliriumTrack._id,
      user: firstUser._id,
      datetime: "2023-05-17T09:44:29.550+00:00",
    },
    {
      track: absolutionTrack._id,
      user: firstUser._id,
      datetime: "2023-05-17T11:46:44.558+00:00",
    },
    {
      track: timeIsTrack._id,
      user: firstUser._id,
      datetime: "2023-05-17T11:47:28.137+00:00",
    },
  );

  await db.close();
});