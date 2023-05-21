import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { CardContent, Chip } from "@mui/material";


interface Props {
  track_num: number;
  title: string;
  duration: string;
  handleSaveTrack: () => Promise<void>;
  published: boolean;
}

const TrackItem = ({ track_num, title, duration, handleSaveTrack, published }: Props) => {

  return (
    <>
      <ListItem sx={{cursor: 'pointer'}} onClick={handleSaveTrack}>
        <ListItemText  primary={`${track_num}. ${title}`} secondary={duration}/>
        {!published ? <Chip label="unpublished" /> : null}
      </ListItem>
      <Divider />
    </>

  )
}

export default TrackItem;