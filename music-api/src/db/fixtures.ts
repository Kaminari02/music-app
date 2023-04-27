import mongoose from 'mongoose';
import Artist from '../models/Artist'
import Album from '../models/Album'
import Track from '../models/Track'

mongoose.connect('mongodb://localhost/music-api');

const db = mongoose.connection;

db.once('open', async () => {
  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
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

   await Track.create({
    title: 'Kids',
    album: oracularAlbum._id,
    duration: '5:03'
  }, {
    title: 'Time to Pretend',
    album: oracularAlbum._id,
    duration: '4:21'
  });

  db.close();
});