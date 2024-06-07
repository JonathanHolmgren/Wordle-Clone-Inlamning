import { useState, useEffect } from "react";
import BoardRowTiles from "./BoardRowTiles";

import '../styles/BoardTiles.css'


function BoardTiles({ guessedLetter, checkWin, numOfAtt, countGuesses}) {

    const result = [
        ["wrong", "wrong", "wrong", "wrong-location", "wrong-location"],
        ["correct", "correct", "wrong", "wrong-location", "wrong"],
        ["correct", "correct", "correct", "correct", "correct"],
        ["active", "active", "active", "active", "active"],
        ["active", "active", "active", "active", "active"]
    ]

const [guessWords, SetguessWords] = useState(Array(numOfAtt).fill(""))


 

useEffect(() => {
    if (countGuesses >= 0 && countGuesses < numOfAtt) {
        SetguessWords(curr => {
        const newGuessWords = [...curr];
        newGuessWords[countGuesses] = guessedLetter;
        return newGuessWords;
      });
    }
  }, [guessedLetter, countGuesses, numOfAtt]);


  const cons = () => {
    console.log(guessWords)
  }


    return (
        <div data-guess-grid className="guess-grid">
            <BoardRowTiles word={guessWords[0]} result={result[0]} />
            <BoardRowTiles word={guessWords[1]} result={result[1]} />
            <BoardRowTiles word={guessWords[2]} result={result[2]} />
            <BoardRowTiles word={guessWords[3]} result={result[3]} />
            <BoardRowTiles word={guessWords[4]} result={result[4]} />
            <button onClick={cons}>Click here</button>
        </div>
    );
}


export default BoardTiles;


