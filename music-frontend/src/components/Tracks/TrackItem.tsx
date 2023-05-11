import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


interface Props {
  track_num: number;
  title: string;
  duration: string;
  handleSaveTrack: () => Promise<void>
}

const TrackItem = ({ track_num, title, duration, handleSaveTrack }: Props) => {

  return (
    <>
      <ListItem sx={{cursor: 'pointer'}} onClick={handleSaveTrack}>
        <ListItemText primary={`${track_num}. ${title}`} secondary={duration}/>
      </ListItem>
      <Divider />
    </>

  )
}

export default TrackItem;