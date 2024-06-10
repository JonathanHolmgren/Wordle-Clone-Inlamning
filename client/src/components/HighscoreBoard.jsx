import '../styles/HighscoreBoard.css';

function HighscoreBoard({ highscores }) {
  const renderScores = highscores.map((item, idx) => (
    <li key={idx}>
      Name: {item.username} - Score: {item.time}{' '}
    </li>
  ));

  const cons = () => {
    console.log(highscores);
  };

  return (
    <div className='containerHighScore'>
      <button onClick={cons}></button>
      <div className='scoreboard'>
        <ul>{renderScores}</ul>
      </div>
    </div>
  );
}

export default HighscoreBoard;
