import React, { useState, FormEvent, ChangeEvent } from "react";
import { makeStyles } from "@mui/styles";
import { Alert, Box, Button, Grid, Snackbar, Typography } from "@mui/material";
import { Theme } from '@mui/material/styles';
import FileUpload from "../UI/Form/FileUpload";
import FormElement from "../UI/Form/FormElement";
import { useGetArtistsQuery } from "@/store/services/artist";

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
    onSubmit: (product: FormData) => void;
}

interface AlbumForm {
    title: string;
    artist: string;
    image: string;
    release_date: string;
}

const AlbumForm = ({ onSubmit }: Props) => {
    const classes = useStyles();
    const { data: artists } = useGetArtistsQuery();

    const [state, setState] = useState<AlbumForm>({
        title: "",
        artist: "",
        release_date: "",
        image: ""
    });
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!state.title || !state.image || !state.image || !state.artist) {
            setOpen(true)
        } else {
            setOpen(false)
            const formData = new FormData();
            for (let key in state) {
                formData.append(key, state[key as keyof typeof state])
            }
            onSubmit(formData);
        }
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setState(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        if (e.target.files) {
            const file = e.target.files[0];
            setState(prevState => ({
                ...prevState,
                [name]: file
            }))
        }
    }

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
                                name="artist"
                                label="Artist's name"
                                required={true}
                                select={true}
                                options={artists}
                                value={state.artist}
                                onChange={inputChangeHandler} />
                            <FormElement
                                required
                                value={state.title}
                                onChange={inputChangeHandler}
                                name='title'
                                label={`Album's title`}
                            />
                            <FormElement
                                required
                                value={state.release_date}
                                onChange={inputChangeHandler}
                                name='release_date'
                                label='Release_date'
                                id='release_date'
                            />
                        </Grid>
                    </Box>
                </Box>
                <Grid item xs>
                    <FileUpload label="Image" name='image' onChange={fileChangeHandler}></FileUpload>
                </Grid>
                <Grid item xs>
                    <Button type="submit" variant="contained">Send</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default AlbumForm;