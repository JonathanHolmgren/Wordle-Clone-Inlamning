import { useState, useEffect } from "react";

import '../styles/LetterTile.css'



function BoardRowTiles({ word = "", result }) {

    return (
        <>
            <div className="tile" data-state={result[0]}>{word[0]}</div>
            <div className="tile" data-state={result[1]}>{word[1]}</div>
            <div className="tile" data-state={result[2]}>{word[2]}</div>
            <div className="tile" data-state={result[3]}>{word[3]}</div>
            <div className="tile" data-state={result[4]}>{word[4]}</div>
        </>
    );


}

export default BoardRowTiles;
