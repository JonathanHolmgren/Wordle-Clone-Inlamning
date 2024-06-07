import { useState, useEffect } from "react";
import BoardTiles from "./BoardTiles";
import '../styles/WordleGame.css'
import checkIfTwoWordMatch from '../utils/checkWord'
import Keyboard from './Keyboard'



function WordleGame() {

    const WORD_LENGTH = 5;
    const NUM_ATTEMPT = 6;
   

    const [guessedLetters, setGuessedLetters] = useState("");
    const [checkWin, setCheckWin] = useState();
    const [countGuesses, setCounterGuesses] = useState(0);


    const submitGuess = () => {
        if (countGuesses <= NUM_ATTEMPT) {
           
            console.log(checkIfTwoWordMatch("hello", guessedLetters.join("")))
            setCheckWin(checkIfTwoWordMatch("hello", guessedLetters.join("")))
            setCounterGuesses(countGuesses + 1)
            setGuessedLetters("");
        }
    }

    function handleKeyPress(key) {
        if (guessedLetters.length >= WORD_LENGTH) return;
        setGuessedLetters([...guessedLetters, key]);
    }

    function removeLetter() {
        if (guessedLetters.length > 0) {
            setGuessedLetters(guessedLetters.slice(0, -1))
        }
    }

    return (
        <>
            <BoardTiles guessedLetter={guessedLetters} checkWin={checkWin} numOfAtt={NUM_ATTEMPT} countGuesses={countGuesses}  />
            <Keyboard onKeyClick={handleKeyPress} submitGuess={submitGuess} removeLetter={removeLetter} />
        </>

    )
}

export default WordleGame;