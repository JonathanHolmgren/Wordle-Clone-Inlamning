import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import HighscorePage from './pages/HighscorePage';
import './App.css';
const RANDOM_WORD_URL = 'http://localhost:5080';

function App() {
  const FetchDataComponent = () => {
    const handleClick = () => {
      fetch(RANDOM_WORD_URL)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };
    handleClick();
  };

  return (
    <>
      <button onClick={FetchDataComponent}>show data from server</button>
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
