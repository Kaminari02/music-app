import React from 'react';
import { Link } from "react-router-dom";
import { Grid, Card, CardHeader, CardActions, CardMedia, Button, Chip, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { apiUrl } from '@/common/constants';
import { IArtist } from '@/interfaces/IArtist';

interface Props {
  title: string;
  image: string;
  id: string
  published: boolean;
  role?: string | null;
  updateArtist?: () => Promise<void>;
  deleteArtist?: () => Promise<void>;
}

const ArtistItem = ({ title, image, id, published, role, updateArtist, deleteArtist }: Props) => {
  let cardImage;

  if (image) {
    cardImage = `${apiUrl}/uploads/artists/${image}`;
  }
  return (
    <Grid sx={{marginTop: 5}} item xs={12} sm={12} md={6} lg={4} minWidth={350}>
      <Card sx={{ height: "100%", maxWidth: 345 }}>
        <CardContent sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
          {!published ? 
        <>
          <Chip label="unpublished" /><IconButton onClick={updateArtist} aria-label="publish"><ArrowCircleUpIcon /></IconButton>
        </>
         : null}
         {role === 'Admin' ? <IconButton onClick={deleteArtist} aria-label="delete"><DeleteIcon /></IconButton> : null}
         </CardContent>
        
        {cardImage ? <CardMedia sx={{ height: 350 }} image={cardImage} title={title} /> : null}
        <CardHeader title={title} />
        <CardActions>
          <Button component={Link} to={'/artist/' + id + '/albums'} sx={{ bgcolor: '#4caf50', color: '#fff', margin: 1, "&:hover": { bgcolor: '#81c784' } }}>See albums...</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArtistItem;