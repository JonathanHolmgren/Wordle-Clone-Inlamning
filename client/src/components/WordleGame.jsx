import { useState, useEffect } from 'react';
import BoardTiles from './BoardTiles';
import '../styles/WordleGame.css';
import checkIfTwoWordMatch from '../utils/checkWord';
import Keyboard from './Keyboard';

function WordleGame() {
  const WORD_LENGTH = 5;
  const NUM_ATTEMPT = 6;

  const [guessedLetters, setGuessedLetters] = useState('');
  const [guessWords, SetguessWords] = useState(Array(NUM_ATTEMPT).fill(''));
  const [results, Setresult] = useState(Array(NUM_ATTEMPT).fill(''));
  const [checkWin, setCheckWin] = useState();
  const [countGuesses, setCounterGuesses] = useState(0);

  useEffect(() => {
    if (countGuesses >= 0 && countGuesses < NUM_ATTEMPT) {
      Setresult((curr) => {
        const newresults = [...curr];
        newresults[countGuesses] = checkWin;
        return newresults;
      });
    }
  }, [checkWin]);

  useEffect(() => {
    if (countGuesses >= 0 && countGuesses < NUM_ATTEMPT) {
      SetguessWords((curr) => {
        const newGuessWords = [...curr];
        newGuessWords[countGuesses] = guessedLetters;
        return newGuessWords;
      });
    }
  }, [guessedLetters, countGuesses, NUM_ATTEMPT]);

  const submitGuess = () => {
    if (countGuesses <= NUM_ATTEMPT && guessedLetters.length == 5) {
      console.log(checkIfTwoWordMatch('hello', guessedLetters.join('')));
      setCheckWin(checkIfTwoWordMatch('hello', guessedLetters.join('')));
      setCounterGuesses(countGuesses + 1);
      setGuessedLetters('');
    }
  };

  function handleKeyPress(key) {
    if (guessedLetters.length >= WORD_LENGTH) return;
    setGuessedLetters([...guessedLetters, key]);
  }

  function removeLetter() {
    if (guessedLetters.length > 0) {
      setGuessedLetters(guessedLetters.slice(0, -1));
    }
  }

  return (
    <>
      <button>Reset game</button>
      <BoardTiles
        guessWords={guessWords}
        results={results}
        numOfAtt={NUM_ATTEMPT}
      />
      <Keyboard
        onKeyClick={handleKeyPress}
        submitGuess={submitGuess}
        removeLetter={removeLetter}
      />
    </>
  );
}

export default WordleGame;
