import { useEffect, useState } from 'react';
import '../styles/GameStart.css';

function GameStart({ startGame, isGameOver }) {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (isGameOver) {
      setIsActive(true);
    }
  }, [isGameOver]);

  const start = () => {
    startGame();
    setIsActive(false);
  };

  return (
    <>
      <div className={`modal-overlay ${isActive ? 'active' : ''}`}>
        <div className={`ContainerModul ${isActive ? 'active' : ''}`}>
          <div className='contentStartGame'>
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
