import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/homepage' element={<HomePage />} />
          {/* <Route path="/highscore" element={<HighScore />}/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
