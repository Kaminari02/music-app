import React from "react";
import TrackForm from "@/components/TrackForm/TrackForm";
import { useNavigate } from 'react-router-dom';
import { useAddTrackMutation } from "@/store/services/track";
import { IPostTrack } from "@/interfaces/IPostTrack";


const NewTrack = () => {
    const navigate = useNavigate();
    const [addTrack] = useAddTrackMutation();

    const onTrackFormSubmit = async (track: IPostTrack) => {
        const data = await addTrack(track);
        if (!(data as { error: object }).error) {
            navigate('/');
        }
    };

    return (
        <TrackForm onSubmit={onTrackFormSubmit} />
    );
};

export default NewTrack;