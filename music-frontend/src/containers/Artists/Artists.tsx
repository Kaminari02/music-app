import React from 'react';
import { Typography, Grid} from '@mui/material';
import {useGetArtistsQuery, useUpdateArtistMutation, useDeleteArtistMutation} from '@/store/services/artist';
import ArtistItem from '@/components/Artist/ArtistItem';
import { useAppSelector } from '@/hooks/reduxHooks';
import { IArtist } from '@/interfaces/IArtist';

const Artists = () => {
  const { data: artists } = useGetArtistsQuery();
  const { user } = useAppSelector(state => state.auth);
  const [updateArtist] = useUpdateArtistMutation();
  const handleUpdate = async (id: string, artist: IArtist) => {
    await updateArtist({id: id, body: artist})
  }
  const [deleteArtist] = useDeleteArtistMutation();
  const handleDelete = async (id: string) => {
    await deleteArtist(id)
  }
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
                deleteArtist={() => handleDelete(artist._id)}
                updateArtist={() => handleUpdate(artist._id, artist)}
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
