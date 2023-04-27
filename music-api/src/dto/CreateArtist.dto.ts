export class CreateArtistDto {
    title: string;
    image: string;
    description: string;
    constructor(title: string, image: string, description: string) {
        this.title = title;
        this.image = image;
        this.description = description;
    }
}