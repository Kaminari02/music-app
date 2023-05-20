import React from "react";
import ArtistForm from "@/components/ArtistForm/ArtistForm";
import { useNavigate } from 'react-router-dom';


const NewArtist = () => {
    const navigate = useNavigate();
    // const [addNewArtist] = useAddNewArtistMutation();

    // const onNewsFormSubmit = async (post: FormData) => {
    //     const data = await addNewArtist(post);
    //     if (!(data as { error: object }).error) {
    //         navigate('/');
    //     }
    // };

    return (
        <>
            <ArtistForm onSubmit={() => {}} />
        </>
    );
};

export default NewArtist;