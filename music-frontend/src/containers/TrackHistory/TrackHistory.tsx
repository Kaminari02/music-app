import { Divider, Grid, Typography, List } from "@mui/material";
import TrackHistoryItem from "@/components/Tracks/TrackHistoryItem";
import { useGetTrackHistoryQuery } from "@/store/services/music";

const TrackHistory = () => {
    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
    };

    const {data: trackHistory} = useGetTrackHistoryQuery();

    return (
        <Grid container direction="column" spacing={5} marginBottom={5}>
            <Grid item>
                <Typography variant="h4">
                    <Divider textAlign="left">Tracks history</Divider>
                </Typography>
            </Grid>
            <Grid item container direction="row" spacing={1} xs>
                <List sx={style}>
                    {trackHistory && trackHistory.map(track => (
                        <TrackHistoryItem
                            key={track._id}
                            artist_title={track.artist[0].title}
                            track_title={track.track[0].title}
                            datetime={track.datetime}
                        />
                    ))}
                </List>
            </Grid>
        </Grid>
    )
}

export default TrackHistory;