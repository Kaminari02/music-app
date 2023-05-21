import React from "react";
import ArtistForm from "@/components/ArtistForm/ArtistForm";
import { useNavigate } from 'react-router-dom';
import { useAddArtistMutation } from "@/store/services/artist";


const NewArtist = () => {
    const navigate = useNavigate();
    const [addArtist] = useAddArtistMutation();

    const onNewsFormSubmit = async (post: FormData) => {
        const data = await addArtist(post);
        if (!(data as { error: object }).error) {
            navigate('/');
        }
    };

    return (
        <>
            <ArtistForm onSubmit={onNewsFormSubmit} />
        </>
    );
};

export default NewArtist;