import { useState } from 'react';
import '../styles/GameStart.css';

function GameStart({ startGame }) {
  const [isActive, setIsActive] = useState(true);

  const start = () => {
    startGame();
    setIsActive(false);
  };

  return (
    <>
      <div className={`modal-overlay ${isActive ? 'active' : ''}`}>
        <div className={`ContainerModul ${isActive ? 'active' : ''}`}>
          <div className='contentStartGame'>
            <img src='../public/Wordle-Emblem.png' alt='' />
            <h2>Welcome</h2>
            <p>Get 6 chances to guess a 5-letter word.</p>
            <button onClick={start}>start game</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameStart;