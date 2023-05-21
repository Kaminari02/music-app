import React from "react";
import TrackForm from "@/components/TrackForm/TrackForm";
import { useNavigate } from 'react-router-dom';
// import { useAddTrackMutation } from "@/store/services/artist";
import { IPostTrack } from "@/interfaces/IPostTrack";


const NewTrack = () => {
    const navigate = useNavigate();
    // const [addTrack] = useAddTrackMutation();

    // const onArtistFormSubmit = async (track: IPostTrack) => {
    //     const data = await addTrack(track);
    //     if (!(data as { error: object }).error) {
    //         navigate('/');
    //     }
    // };

    return (
        
            <TrackForm onSubmit={() => {}} />
        
    );
};

export default NewTrack;