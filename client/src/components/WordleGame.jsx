import { useState, useEffect } from 'react';
import BoardTiles from './BoardTiles';
import Keyboard from './Keyboard';
import EnterThePlayer from './EnterThePlayer';
import checkIfTwoWordMatch from '../utils/checkWord';

import '../styles/WordleGame.css';
const RANDOM_WORD_URL = 'http://localhost:5080';

function WordleGame({ reset }) {
  const WORD_LENGTH = 5;
  const NUM_ATTEMPT = 6;

  const resetResult = [
    ['active', 'active', 'active', 'active', 'active'],
    ['active', 'active', 'active', 'active', 'active'],
    ['active', 'active', 'active', 'active', 'active'],
    ['active', 'active', 'active', 'active', 'active'],
    ['active', 'active', 'active', 'active', 'active'],
  ];

  const [guessedLetters, setGuessedLetters] = useState('');
  const [guessWords, SetguessWords] = useState(Array(NUM_ATTEMPT).fill(''));
  const [results, Setresult] = useState(Array(NUM_ATTEMPT).fill(''));
  const [checkWin, setCheckWin] = useState();
  const [countGuesses, setCounterGuesses] = useState(0);
  const [CurrentPlayer, SetCurrentPlayer] = useState({});
  const [newWord, SetNewWord] = useState('');
  const [isWon, SetIsWon] = useState(false);
  const [stopTime, SetstopTime] = useState('');

  useEffect(() => {
    FetchDataComponent();
    resetGame();
  }, [reset]);

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

  async function FetchDataComponent() {
    fetch(RANDOM_WORD_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        SetNewWord(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  const startGame = async (player) => {
    FetchStartGame();
    SetCurrentPlayer(player);
  };

  async function FetchStartGame() {
    fetch(RANDOM_WORD_URL + '/start')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  async function EndTheGame() {
    fetch(RANDOM_WORD_URL + '/stop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(CurrentPlayer),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        SetstopTime(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  const submitGuess = async () => {
    if (countGuesses <= NUM_ATTEMPT && guessedLetters.length == 5) {
      const x = checkIfTwoWordMatch(newWord, guessedLetters.join(''));
      console.log(x);
      setCheckWin(x);
      setCounterGuesses(countGuesses + 1);
      setGuessedLetters('');
      checkIfWin(x);
    }
  };

  const checkIfWin = (x) => {
    if (x.every((i) => i.result === 'correct')) {
      console.log('All results are correct');
      EndTheGame();
      SetIsWon(true);
    } else {
      console.log('Not all results are correct');
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
  const resetGame = () => {
    Setresult(resetResult);
    SetguessWords(Array(NUM_ATTEMPT).fill(''));
    setCounterGuesses(0);
    SetIsWon(false);
  };

  return (
    <div className='container'>
      {isWon && (
        <h1>
          You won {CurrentPlayer.username}! and your time was {stopTime}s
        </h1>
      )}
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
      <EnterThePlayer startGame={startGame} />
    </div>
  );
}

export default WordleGame;
