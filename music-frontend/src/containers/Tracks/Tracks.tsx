import React from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Divider, Grid, Typography, List } from "@mui/material";
import { useGetTracksQuery } from "@/store/services/music";
import { apiUrl } from "@/common/constants";
import TrackItem from "@/components/Tracks/TrackItem";

const Tracks = () => {
  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };

  const { id } = useParams();

  const { data: tracks } = useGetTracksQuery(id);
  let albumImage;

  if (tracks) {
    albumImage = `${apiUrl}/uploads/albums/${tracks[0].album.image}`;
  }

  return (
    <Grid container direction="column" spacing={5} marginBottom={5}>
      <Grid item>
        <Typography variant="h1" component="h2">{tracks && tracks[0].album.artist.title}</Typography>
      </Grid>
      <Grid item container direction="row">
        <Grid item>
          <Card elevation={5} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  {tracks && tracks[0].album.title}
                </Typography>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={albumImage}
              alt={tracks && tracks[0].album.title}
            />
          </Card>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h4">
          <Divider textAlign="left">Tracks</Divider>
        </Typography>
      </Grid>
      <Grid item container direction="row" spacing={1} xs>
        <List sx={style}>
          {tracks && tracks.map(track => (
            <TrackItem
              key={track._id}
              title={track.title}
              track_num={track.track_num}
              duration={track.duration}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  )
}

export default Tracks;