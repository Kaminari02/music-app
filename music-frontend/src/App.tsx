import React from 'react';
import {Route, Routes} from "react-router-dom";
import {CssBaseline, Container} from '@mui/material';
import AppToolbar from '@/components/UI/Apptoolbar';
import Artists from "./containers/Artists/Artists";
import Albums from './containers/Albums/Albums';
import Tracks from './containers/Tracks/Tracks';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import TrackHistory from './containers/TrackHistory/TrackHistory';
import NewArtist from './containers/NewArtist/NewArtist';
import NewAlbum from './containers/NewAlbum/NewAlbum';
import NewTrack from './containers/NewTrack/NewTrack';
import { useAppSelector } from './hooks/reduxHooks';

const App = () => {
  const { user } = useAppSelector(state => state.auth);
  return (
    <>
    <CssBaseline/>
    <header>
      <AppToolbar/>
    </header>
    <main>
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Artists/>} />
          <Route path="artist/:id/albums" element={<Albums/>} />
          <Route path="album/:id/tracks" element={<Tracks />} />
          <Route path='/track_history' element={(
              <ProtectedRoute isAllowed={!!user} redirectPath='/'>
                <TrackHistory/>
              </ProtectedRoute>
            )} />
          <Route path='/register' element={(
              <ProtectedRoute isAllowed={!user} redirectPath='/'>
                <Register/>
              </ProtectedRoute>
            )} />
          <Route path='/login' element={(
              <ProtectedRoute isAllowed={!user} redirectPath='/'>
                <Login/>
              </ProtectedRoute>
            )} />
          <Route path='/newArtist' element={(
              <ProtectedRoute isAllowed={!!user} redirectPath='/'>
                <NewArtist/>
              </ProtectedRoute>
            )} />
          <Route path='/newAlbum' element={(
              <ProtectedRoute isAllowed={!!user} redirectPath='/'>
                <NewAlbum/>
              </ProtectedRoute>
            )} />
          <Route path='/newTrack' element={(
              <ProtectedRoute isAllowed={!!user} redirectPath='/'>
                <NewTrack/>
              </ProtectedRoute>
            )} />
        </Routes>
      </Container>
    </main>
  </>
  )
};

export default App;
