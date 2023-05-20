import { Schema, model } from "mongoose";

const ArtistSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  published: {
    type: Boolean,
    default: false
  }
});

const Artist = model("artist", ArtistSchema);

export default Artist;