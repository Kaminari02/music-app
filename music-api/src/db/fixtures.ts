import mongoose from 'mongoose';
import Artist from '../models/Artist';
import Album from '../models/Album';
import Track from '../models/Track';
import User from '../models/User';
import Track_History from '../models/Track_History';

mongoose.connect('mongodb://localhost/music-api');

const db = mongoose.connection;

db.once('open', async () => {
  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
    await db.dropCollection('track_histories');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [museArtist, mgmtArtist] = await Artist.create({
    title: 'Muse',
    description: 'Rock band from England',
    image: 'muse.jpg'
  }, {
    title: 'MGMT',
    description: 'indie rock band from US',
    image: 'MGMT.webp'
  });

  const [absolutionAlbum, congratulationAlbum, oracularAlbum ] = await Album.create({
    title: 'Absolution',
    artist: museArtist._id,
    image: 'absolution.jpg',
    release_date: '2003'
  }, {
    title: 'Congratulations',
    artist: mgmtArtist._id,
    image: 'mgmtAlbum.jpg',
    release_date: '2010'
  }, {
    title: 'Oracular Spectacular',
    artist: mgmtArtist._id,
    image: 'mgmtAlbum.jpg',
    release_date: '2007'
  });

   const [kidsTrack, PretendTrack] = await Track.create({
    title: 'Kids',
    album: oracularAlbum._id,
    duration: '5:03'
  }, {
    title: 'Time to Pretend',
    album: oracularAlbum._id,
    duration: '4:21'
  });

  const [firstUser, secondUser] = await User.create({
    username: 'John Doe',
    password: '1234',
    token: 'PpzxXGuMOqBSpvslWSpKG'
  }, {
    username: 'Jane Smith',
    password: '9876',
    token: 'awyMP9ARemTj2xKIZKl0_'
  });

  const [firstHistory, secondHistory] = await Track_History.create({
    track: kidsTrack._id,
    user: firstUser._id,
    datetime: '2023-05-03T11:01:47.108+00:00'
  }, {
    track: PretendTrack._id,
    user: secondUser._id,
    datetime: '2023-05-03T11:21:55.681+00:00'
  })

  await db.close();
});