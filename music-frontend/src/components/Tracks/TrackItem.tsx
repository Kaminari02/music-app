import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Chip, ListItemButton, ListItemIcon } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';


interface Props {
  track_num: number;
  title: string;
  duration: string;
  handleSaveTrack: () => Promise<void>;
  published: boolean;
  role?: string
}

const TrackItem = ({ track_num, title, duration, handleSaveTrack, published, role }: Props) => {

  return (
    <>
      <ListItem sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
        <ListItemText onClick={handleSaveTrack} primary={`${track_num}. ${title}`} secondary={duration} />
        {!published
          ?
          <>
            <ListItemButton sx={{ justifyContent: 'flex-end' }}>
              <ListItemIcon aria-label="publish">
                <ArrowCircleUpIcon />
              </ListItemIcon>
            </ListItemButton>
          </>
          : null}
        {role === 'Admin'
          ?
          <ListItemButton sx={{ justifyContent: 'flex-end' }}>
            <ListItemIcon aria-label="delete">
              <DeleteIcon />
            </ListItemIcon>
          </ListItemButton>
          : null
        }
      </ListItem>
      <Divider />
    </>

  )
}

export default TrackItem;