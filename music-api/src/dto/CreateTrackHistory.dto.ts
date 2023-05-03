export class CreateTrackHistoryDto {
    user: string;
    track: string;
    constructor (user: string, track: string) {
        this.user = user;
        this.track = track;
    }
}