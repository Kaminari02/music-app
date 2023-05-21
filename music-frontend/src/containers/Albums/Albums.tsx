import React from "react";
import { useParams } from "react-router-dom";
import { useGetAlbumsQuery } from "@/store/services/album";
import { Box, Card, CardContent, CardMedia, Grid, Typography, Divider } from "@mui/material";
import AlbumItem from "@/components/Albums/AlbumItem";
import { apiUrl } from "@/common/constants";

const Albums = () => {
    const { id } = useParams();
    let artistImage;

    const { data: albums } = useGetAlbumsQuery(id);

    if (albums) {
        artistImage = `${apiUrl}/uploads/artists/${albums[0].artist.image}`;
    }

    return (
        <Grid container direction="column" spacing={5} marginBottom={5}>
            <Grid item container direction="row">
                <Grid item>
                    <Card elevation={5} sx={{ display: 'flex' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {albums && albums[0].artist.title}
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={artistImage}
                            alt={albums && albums[0].artist.title}
                        />
                    </Card>
                </Grid>
            </Grid>
            <Grid item>
                <Typography variant="h4">
                    <Divider>Albums</Divider>
                </Typography>
            </Grid>
            <Grid item container direction="row" spacing={1} xs>
                {albums && albums.map(album => (
                    <AlbumItem
                        key={album._id}
                        id={album._id}
                        albumTitle={album.title}
                        albumImg={album.image}
                        release_date={album.release_date}
                    />
                ))}
            </Grid>
        </Grid>
    )
}

export default Albums;