import '../styles/HighscoreBoard.css';

function HighscoreBoard({ highscores }) {
  //const scores = Array(10).fill({ name: 'Joe Doe', score: '1 min 2s' });

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
