import { useForm } from 'react-hook-form';
import { useState } from 'react';
import '../styles/EnterThePlayer.css';

function EnterThePlayer({ startGame }) {
  const [isActive, setIsActive] = useState(true);

  const startsGame = () => {
    startGame();
    setIsActive(false);
  };

  return (
    <>
      <div className={`modal-overlay ${isActive ? 'active' : ''}`}>
        <div className={`ContainerEnterPlayer ${isActive ? 'active' : ''}`}>
          <button onClick={startsGame}>start game</button>
        </div>
      </div>
    </>
  );
}

export default EnterThePlayer;
