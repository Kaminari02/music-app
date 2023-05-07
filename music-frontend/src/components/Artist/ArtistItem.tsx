import React from 'react';
import { Link } from "react-router-dom";
import { Grid, Card, CardHeader, CardContent, CardActions, CardMedia, Button } from '@mui/material';
import { apiUrl } from '@/common/constants';

interface Props {
  title: string;
  image: string;
}

const ArtistItem = ({ title, image }: Props) => {
  let cardImage;

  if (image) {
    cardImage = `${apiUrl}/uploads/artists/${image}`;
  }
  return (
    <Grid item xs={12} sm={12} md={6} lg={4} minWidth={350}>
      <Card sx={{ height: "100%", maxWidth: 345 }}>
        {cardImage ? <CardMedia sx={{ height: 350 }} image={cardImage} title={title} /> : null}
          <CardHeader title={title} />
        <CardActions>
          <Button sx={{bgcolor: '#4caf50', color: '#fff', margin: 1}}>See albums...</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArtistItem ;