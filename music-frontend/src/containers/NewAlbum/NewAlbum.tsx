import React from "react";
import AlbumForm from "@/components/AlbumForm/AlbumForm";
import { useNavigate } from 'react-router-dom';
import { useAddAlbumMutation } from "@/store/services/album";


const NewAlbum = () => {
    const navigate = useNavigate();
    const [addAlbum] = useAddAlbumMutation();

    const onAlbumFormSubmit = async (album: FormData) => {
        const data = await addAlbum(album);
        if (!(data as { error: object }).error) {
            navigate('/');
        }
    };

    return (
        <>
            <AlbumForm onSubmit={onAlbumFormSubmit} />
        </>
    );
};

export default NewAlbum;