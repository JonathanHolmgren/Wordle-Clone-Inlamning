import { useState, useEffect } from 'react';
import BoardTiles from './BoardTiles';
import Keyboard from './Keyboard';
import GameStart from './GameStart';
import HighScoreSubmit from './HighScoreSubmit';
import '../styles/Modul.css';

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
    ['active', 'active', 'active', 'active', 'active'],
  ];

  const [guessedLetters, setGuessedLetters] = useState('');
  const [guessWords, SetguessWords] = useState(Array(NUM_ATTEMPT).fill(''));
  const [results, Setresult] = useState(Array(NUM_ATTEMPT).fill(''));
  const [checkWin, setCheckWin] = useState();
  const [countGuesses, setCounterGuesses] = useState(0);
  const [isWon, SetIsWon] = useState(false);
  const [isGameOver, SetisGameOver] = useState(false);
  const [stopTime, SetstopTime] = useState('');

  useEffect(() => {
    resetGame();
  }, [reset]);

  useEffect(() => {
    if (countGuesses >= 0 && countGuesses < NUM_ATTEMPT) {
      SetguessWords((curr) => {
        const newGuessWords = [...curr];
        newGuessWords[countGuesses] = guessedLetters;
        return newGuessWords;
      });
    }
  }, [guessedLetters, countGuesses, NUM_ATTEMPT]);

  useEffect(() => {
    if (countGuesses >= 0 && countGuesses < NUM_ATTEMPT) {
      Setresult((curr) => {
        const newresults = [...curr];
        newresults[countGuesses] = checkWin;
        return newresults;
      });
    }
  }, [checkWin]);

  // startar spelet på servern
  function startGame() {
    FetchStartGame();
  }

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

  // stoppar spelet, och retunerar tiden det tog mellan start och stop.
  async function EndTheGame() {
    fetch(RANDOM_WORD_URL + '/stop')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        SetstopTime(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  // Gör en Post request för spara highscore i databasen
  async function submitHighscore(formdata) {
    const data = {
      username: formdata.username,
      countGuesses: countGuesses,
      guessWords: guessWords,
      wordLength: WORD_LENGTH,
    };

    fetch(RANDOM_WORD_URL + '/highscore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  function submitGuess() {
    if (!isWon) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guess: guessedLetters.join(''),
        }),
      };
      fetch(RANDOM_WORD_URL + '/checkwin', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCheckWin(data);
          setCounterGuesses(countGuesses + 1);
          setGuessedLetters('');
          checkIfWin(data);
        });
    }
  }

  function checkIfWin(returResult) {
    if (returResult.every((i) => i.result === 'correct')) {
      console.log('All results are correct');
      EndTheGame();
      SetIsWon(true);
    } else if (countGuesses == NUM_ATTEMPT - 1) {
      alert('you lose');
      SetisGameOver(true);
      resetGame();
    } else {
      console.log('Not all results are correct');
    }
  }

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
    SetguessWords(Array(NUM_ATTEMPT).fill(''));
    setGuessedLetters('');
    Setresult(resetResult);
    setCounterGuesses(0);
    SetIsWon(false);
    startGame();
  };

  return (
    <div className='container'>
      {isWon && (
        <HighScoreSubmit
          stopTime={stopTime}
          submitHighscore={submitHighscore}
        />
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
      <GameStart startGame={startGame} isGameOver={isGameOver} />
    </div>
  );
}

export default WordleGame;
