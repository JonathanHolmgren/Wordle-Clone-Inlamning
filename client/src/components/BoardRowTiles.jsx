import { useState, useEffect } from 'react';

import '../styles/LetterTile.css';

function BoardRowTiles({ word = '', result }) {
  const [newResult, SetnewResult] = useState([]);

  useEffect(() => {
    if (result && result.length > 0) {
      SetnewResult(result.map((obj) => obj.result));
    }
  }, [result]);

  return (
    <>
      <div className='tile' data-state={newResult[0]}>
        {word[0]}
      </div>
      <div className='tile' data-state={newResult[1]}>
        {word[1]}
      </div>
      <div className='tile' data-state={newResult[2]}>
        {word[2]}
      </div>
      <div className='tile' data-state={newResult[3]}>
        {word[3]}
      </div>
      <div className='tile' data-state={newResult[4]}>
        {word[4]}
      </div>
    </>
  );
}

export default BoardRowTiles;
