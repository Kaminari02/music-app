import React from 'react';
import { Typography, Grid} from '@mui/material';
import {useGetArtistsQuery} from '@/store/services/artist';
import ArtistItem from '@/components/Artist/ArtistItem';
import { useAppSelector } from '@/hooks/reduxHooks';

const Artists = () => {
  const { data: artists } = useGetArtistsQuery();
  const { user } = useAppSelector(state => state.auth);

  return (
    <Grid sx={{marginBottom: 5}} container direction="column" spacing={2}>
      <Grid item container direction="row">
        <Grid item>
          <Typography variant="h4">
            Artists
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction="row" spacing={1}>
        {artists && artists.map(artist => (
          user === null ?
            artist.published ?
              <ArtistItem
                published={artist.published}
                key={artist._id}
                id={artist._id}
                title={artist.title}
                image={artist.image}
          /> 
          : 
            null 
          :
          artist.published || user.role === 'Admin'  ?
              <ArtistItem
                role={user.role}
                published={artist.published}
                key={artist._id}
                id={artist._id}
                title={artist.title}
                image={artist.image}
              /> 
          : 
            null
          ))}
      </Grid>
    </Grid>
  );
}

export default Artists;
