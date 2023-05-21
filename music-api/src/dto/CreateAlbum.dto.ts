import { ObjectId } from "mongoose";

export class CreateAlbumDto {
    title: string;
    artist: ObjectId;
    release_date: string;
    image: string;
    constructor(title: string, artist: ObjectId, release_date: string, image: string) {
        this.title = title;
        this.artist = artist;
        this.release_date = release_date;
        this.image = image;
    }
}