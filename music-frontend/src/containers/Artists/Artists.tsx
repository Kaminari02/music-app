import React from 'react';
import { Typography, Grid} from '@mui/material';
import {useGetArtistsQuery} from '@/store/services/music';
import ArtistItem from '@/components/Artist/ArtistItem';

const Artists = () => {
  const { data: artists } = useGetArtistsQuery();

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container direction="row">
        <Grid item>
          <Typography variant="h4">
            Artists
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction="row" spacing={1}>
        {artists && artists.map(artist => (
          <ArtistItem
            key={artist._id}
            id={artist._id}
            title={artist.title}
            image={artist.image}
          />
        ))}
      </Grid>
    </Grid>
  );
}

export default Artists;
