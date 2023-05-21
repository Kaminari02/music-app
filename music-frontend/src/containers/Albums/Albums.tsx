import React from "react";
import { useParams } from "react-router-dom";
import { useGetAlbumsByArtistQuery } from "@/store/services/album";
import { Box, Card, CardContent, CardMedia, Grid, Typography, Divider } from "@mui/material";
import AlbumItem from "@/components/Albums/AlbumItem";
import { useAppSelector } from '@/hooks/reduxHooks';
import { apiUrl } from "@/common/constants";

const Albums = () => {
    const { id } = useParams();
    let artistImage;

    const { user } = useAppSelector(state => state.auth);
    const { data: albums } = useGetAlbumsByArtistQuery(id);

    if (albums && albums.length > 0) {
        artistImage = `${apiUrl}/uploads/artists/${albums[0].artist.image}`;
    }

    return (
        <>
            <Grid sx={{ marginBottom: 5 }} container direction="column" spacing={5} marginBottom={5}>
                {albums && albums?.length > 0 
                ?
                    <>
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
                                user === null ?
                                    album.published ?
                                        <AlbumItem
                                            published={album.published}
                                            key={album._id}
                                            id={album._id}
                                            albumTitle={album.title}
                                            albumImg={album.image}
                                            release_date={album.release_date}
                                        />
                                        :
                                        null
                                    :
                                    album.published || user.role === 'Admin' ?
                                        <AlbumItem
                                            published={album.published}
                                            key={album._id}
                                            id={album._id}
                                            albumTitle={album.title}
                                            albumImg={album.image}
                                            release_date={album.release_date}
                                        />
                                        :
                                        null
                                ))}
                        </Grid>
                    </>
                :
                    <Grid xs item><Typography variant="h3" gutterBottom>No Albums yet</Typography></Grid>}

            </Grid>
        </>
    )
}

export default Albums;