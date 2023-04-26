import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/ajs-11-shop');

const db = mongoose.connection;

db.once('open', async () => {
  try {
    await db.dropCollection('');
    await db.dropCollection('');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }


  db.close();
});