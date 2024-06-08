import { useState } from 'react';
import WordleGame from '../components/WordleGame';
import Keyboard from '../components/Keyboard';
import NavBar from '../components/NavBar';

export default function HomePage() {
  const [reset, SetReset] = useState();

  const resetGame = () => {
    SetReset(Math.random());
  };

  return (
    <>
      <NavBar resetGame={resetGame} />
      <WordleGame reset={reset} />
    </>
  );
}
