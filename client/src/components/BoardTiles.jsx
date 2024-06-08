import BoardRowTiles from './BoardRowTiles';

import '../styles/BoardTiles.css';

function BoardTiles({ guessWords, results }) {
  return (
    <div data-guess-grid className='guess-grid'>
      <BoardRowTiles word={guessWords[0]} result={results[0 + 1]} />
      <BoardRowTiles word={guessWords[1]} result={results[1 + 1]} />
      <BoardRowTiles word={guessWords[2]} result={results[2 + 1]} />
      <BoardRowTiles word={guessWords[3]} result={results[3 + 1]} />
      <BoardRowTiles word={guessWords[4]} result={results[4 + 1]} />
    </div>
  );
}

export default BoardTiles;
