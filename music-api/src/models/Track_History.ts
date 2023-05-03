import { Schema, model } from "mongoose";

const Track_HistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: "track",
    required: true,
  },
  datetime: {
    type: Date,
    required: true
  }
});

const Track_History = model("track", Track_HistorySchema);

export default Track_History;