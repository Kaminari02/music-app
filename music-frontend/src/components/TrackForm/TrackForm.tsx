import React, { useState, FormEvent, ChangeEvent } from "react";
import { makeStyles } from "@mui/styles";
import { Alert, Box, Button, Grid, Snackbar, Typography } from "@mui/material";
import { Theme } from '@mui/material/styles';
import FormElement from "../UI/Form/FormElement";
import { useGetAlbumsQuery } from "@/store/services/album";
import { IPostTrack } from "@/interfaces/IPostTrack";

const useStyles = makeStyles<Theme>(theme => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left'
    },
    root: {
        marginTop: theme.spacing(2)
    },
    form: {
        marginTop: theme.spacing(1),
    }
}));

interface Props {
    onSubmit: (track: IPostTrack) => void;
}

interface TrackForm {
    title: string;
    album: string;
    duration: string;
}

const TrackForm = ({ onSubmit }: Props) => {
    const classes = useStyles();
    const { data: albums } = useGetAlbumsQuery();

    const [state, setState] = useState<TrackForm>({
        title: "",
        album: "",
        duration: ""
    });
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!state.title || !state.album || !state.duration ) {
            setOpen(true)
        } else {
            setOpen(false)
            const data = {
                title: state.title,
                album: state.album,
                duration: state.duration
            }
            onSubmit(data);
        }
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setState(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    return (
        <form
            className={classes.root}
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {'You have to fill all fields'}
                </Alert>
            </Snackbar>
            <Grid container direction="column" spacing={2} component='section' maxWidth='xs' marginLeft={1}>
                <Grid item xs marginTop={2}>
                    <Typography variant="h4">Add new Artist</Typography>
                </Grid>
                <Box className={classes.paper}>
                    <Box className={classes.form}>
                        <Grid container spacing={2} maxWidth='600px' marginLeft={0.2}>
                            <FormElement
                                type="select"
                                name="album"
                                label="Album's name"
                                required={true}
                                select={true}
                                options={albums}
                                value={state.album}
                                onChange={inputChangeHandler} />
                            <FormElement
                                required
                                value={state.title}
                                onChange={inputChangeHandler}
                                name='title'
                                label={`Track's title`}
                            />
                            <FormElement
                                required
                                value={state.duration}
                                placeholder="4:22"
                                onChange={inputChangeHandler}
                                name='duration'
                                label='Duration'
                                id='duration'
                            />
                        </Grid>
                    </Box>
                </Box>
                <Grid item xs>
                    <Button type="submit" variant="contained">Send</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default TrackForm;