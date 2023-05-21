import { ObjectId } from "mongoose";

export class CreateTrackDto {
    title: string;
    album: ObjectId;
    duration: string;
    track_num: number;
    constructor(title: string, album: ObjectId, duration: string, track_num: number) {
        this.title = title;
        this.album = album;
        this.duration = duration;
        this.track_num = track_num;
    }
}