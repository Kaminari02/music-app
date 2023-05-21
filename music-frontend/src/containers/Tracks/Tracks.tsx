import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Divider, Grid, Typography, List, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useGetTracksQuery } from "@/store/services/track";
import { useSaveTrackMutation } from "@/store/services/trackHistory";
import { apiUrl } from "@/common/constants";
import TrackItem from "@/components/Tracks/TrackItem";
import { useAppSelector } from "@/hooks/reduxHooks";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Tracks = () => {
  const style = {
    width: '100%',
    maxWidth: 400,
    bgcolor: 'background.paper',
  };

  const { user } = useAppSelector(state => state.auth);

  const { id } = useParams();

  const { data: tracks } = useGetTracksQuery(id);
  let albumImage;


  if (tracks && tracks.length > 0) {
    albumImage = `${apiUrl}/uploads/albums/${tracks[0].album.image}`;
  }

  const [saveTrack] = useSaveTrackMutation();
  const [open, setOpen] = useState(false);

  const handleSaveTrack = async (id: string) => {
    await saveTrack(id);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Grid container direction="column" spacing={5} marginBottom={5}>
      {tracks && tracks.length > 0 ?
        <>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}>
            {user ?
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {`Track has been added to your history`}
              </Alert>
              :
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {`You have to sign in for saving track to your history!`}
              </Alert>}

          </Snackbar>
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
                user === null ?
                  track.published ?
                    <TrackItem
                      published={track.published}
                      handleSaveTrack={() => handleSaveTrack(track._id)}
                      key={track._id}
                      title={track.title}
                      track_num={track.track_num}
                      duration={track.duration}
                    />
                  :
                    null
                  :
                  track.published || user.role === 'Admin' ?
                    <TrackItem
                      published={track.published}
                      handleSaveTrack={() => handleSaveTrack(track._id)}
                      key={track._id}
                      title={track.title}
                      track_num={track.track_num}
                      duration={track.duration}
                    />
                    :
                    null
              ))}
            </List>
          </Grid>
        </>
        :
        <Grid item xs>
          <Typography variant="h3" gutterBottom>No added tracks yet</Typography>
        </Grid>
      }
    </Grid>
  )
}

export default Tracks;