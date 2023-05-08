import React from 'react';
import {Route, Routes} from "react-router-dom";
import {CssBaseline, Container} from '@mui/material';
import AppToolbar from '@/components/UI/Apptoolbar';
import Artists from "./containers/Artists/Artists";
import Albums from './containers/Albums/Albums';
import Tracks from './containers/Tracks/Tracks';

const App = () => (
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
        </Routes>
      </Container>
    </main>
  </>
);

export default App;
