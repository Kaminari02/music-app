export class CreateTrackHistoryDto {
    user: string;
    track: string;
    datetime: Date;
    constructor (user: string, track: string, datetime: Date) {
        this.user = user;
        this.track = track;
        this.datetime = datetime;
    }
}