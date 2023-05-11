import { IArtist } from "./IArtist";
import { ITrack } from "./ITrack";

export interface ITrackHistory {
  user: string;
  track: ITrack[];
  artist: IArtist[];
  datetime: Date;
  _id: string;
}
