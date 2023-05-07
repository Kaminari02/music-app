import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from "@mui/styles";
import {Typography, Toolbar, AppBar, Grid, Button} from '@mui/material';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles<Theme>(theme => ({
  mainLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit'
    }
  },
  staticToolbar: {
    marginBottom: theme.spacing(2)
  }
}));

const AppToolbar = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: '#4caf50' }}>
        <Toolbar>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Typography variant="h6">
              <Link to="/" className={classes.mainLink}>Spotify</Link>
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.staticToolbar}/>
    </>
  );
};

export default AppToolbar;