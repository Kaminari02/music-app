import React from 'react';
import { Link } from "react-router-dom";
import { Grid, Card, CardHeader, CardContent, CardActions, CardMedia, Button, Typography } from '@mui/material';
import { apiUrl } from '@/common/constants';

interface Props {
    albumImg: string;
    id: string;
    albumTitle: string;
    release_date: string;
}

const AlbumItem = ({ albumImg, id, albumTitle, release_date }: Props) => {
    let albumImage;

    if (albumImg) {
        albumImage = `${apiUrl}/uploads/albums/${albumImg}`;
    }
    return (
        <Grid item xs={12} sm={12} md={6} lg={4} minWidth={350}>
                <Card elevation={3} sx={{ height: "100%", maxWidth: 345 }}>
                    {albumImage ? <CardMedia sx={{ height: 350 }} image={albumImage} title={albumTitle} /> : null}
                    <CardHeader title={albumTitle} />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" sx={{fontSize: 16}}>
                            Realease date: {release_date}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button component={Link} to={'/album/' + id + '/tracks'}
                            sx={{ bgcolor: '#4caf50', color: '#fff', margin: 1, "&:hover": { bgcolor: '#81c784' } }}>
                            See tracks...
                        </Button>
                    </CardActions>
                </Card>
        </Grid>
    );
};

export default AlbumItem;