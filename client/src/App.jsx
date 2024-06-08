import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import HighscorePage from './pages/HighscorePage';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/homepage' element={<HomePage />} />
          <Route path='/highscore' element={<HighscorePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
