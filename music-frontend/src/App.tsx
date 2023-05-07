import React from 'react';
import {Route, Routes} from "react-router-dom";
import {CssBaseline, Container} from '@mui/material';
import AppToolbar from '@/components/UI/Apptoolbar';
import Artists from "./containers/Artists/Artists";

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
        </Routes>
      </Container>
    </main>
  </>
);

export default App;
