import '../styles/HighscorePage.css';
import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import HighscoreBoard from '../components/HighscoreBoard';
const RANDOM_WORD_URL = 'http://localhost:5080';

function HighscorePage() {
  const [highscores, SetHighscores] = useState([]);

  useEffect(() => {
    FetchHighScore();
  }, []);

  async function FetchHighScore() {
    fetch(RANDOM_WORD_URL + '/highscore')
      .then((response) => response.json())
      .then((data) => {
        SetHighscores(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  return (
    <>
      <NavBar />
      <h1 className='headingHighscore'>Highscores</h1>
      <HighscoreBoard highscores={highscores} />
    </>
  );
}

export default HighscorePage;
