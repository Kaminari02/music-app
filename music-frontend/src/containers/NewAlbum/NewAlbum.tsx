import React from "react";
import AlbumForm from "@/components/AlbumForm/AlbumForm";
import { useNavigate } from 'react-router-dom';
import { useAddAlbumMutation } from "@/store/services/album";


const NewAlbum = () => {
    const navigate = useNavigate();
    const [addAlbum] = useAddAlbumMutation();

    const onNewsFormSubmit = async (post: FormData) => {
        const data = await addAlbum(post);
        if (!(data as { error: object }).error) {
            navigate('/');
        }
    };

    return (
        <>
            <AlbumForm onSubmit={onNewsFormSubmit} />
        </>
    );
};

export default NewAlbum;