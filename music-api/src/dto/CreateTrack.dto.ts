export class CreateTrackDto {
    title: string;
    album: string;
    duration: string;
    constructor(title: string, album: string, duration: string) {
        this.title = title;
        this.album = album;
        this.duration = duration;
    }
}