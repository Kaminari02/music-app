import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


interface Props {
  artist_title: string;
  track_title: string;
  datetime: Date;
}

const TrackHistoryItem = ({ artist_title, track_title, datetime }: Props) => {
    const date = new Date(datetime);
  return (
    <>
      <ListItem>
        <ListItemText 
            primary={`${artist_title}. 
            ${track_title}`} 
            secondary={`${date.getDay() < 10 ? '0' + date.getDay() : date.getDay()}.${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}/>
      </ListItem>
      <Divider />
    </>

  )
}

export default TrackHistoryItem;