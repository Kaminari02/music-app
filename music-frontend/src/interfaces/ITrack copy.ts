export interface ITrack {
    _id: string;
    title: string;
    track_num: number;
    duration: string;
    album: {
        title: string;
        release_date: string;
        image: string;
        artist: {
            title: string;
        }
    }
}