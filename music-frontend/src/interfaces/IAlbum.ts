export interface IAlbum {
    published: boolean;
    title: string;
    image: string;
    release_date: string;
    _id: string;
    artist: {
        title: string;
        image: string;
    }
}