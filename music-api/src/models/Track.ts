import { Schema, model } from "mongoose";

const TrackSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "album",
    required: true,
  },
  duration: {
    type: String,
    required: true
  },
  track_num: {
    type: Number,
    required: true
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "artist"
  },
  published: {
    type: Boolean,
    default: false
  }
});

const Track = model("track", TrackSchema);

export default Track;