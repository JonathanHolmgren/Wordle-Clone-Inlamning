import '../styles/HighscorePage.css';

import NavBar from '../components/NavBar';
import HighscoreBoard from '../components/HighscoreBoard';

function HighscorePage() {
  return (
    <>
      <NavBar />
      <h1 className='headingHighscore'>Highscores</h1>
      <HighscoreBoard />
    </>
  );
}

export default HighscorePage;
