import React from "react";
import ArtistForm from "@/components/ArtistForm/ArtistForm";
import { useNavigate } from 'react-router-dom';
import { useAddArtistMutation } from "@/store/services/artist";


const NewArtist = () => {
    const navigate = useNavigate();
    const [addArtist] = useAddArtistMutation();

    const onArtistFormSubmit = async (artist: FormData) => {
        const data = await addArtist(artist);
        if (!(data as { error: object }).error) {
            navigate('/');
        }
    };

    return (
        <>
            <ArtistForm onSubmit={onArtistFormSubmit} />
        </>
    );
};

export default NewArtist;