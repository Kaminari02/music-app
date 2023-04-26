import mongoose, { Schema } from "mongoose";

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "artist",
    required: true,
  },
  release_date: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  }
});

const Album = mongoose.model("album", AlbumSchema);

export default Album;
