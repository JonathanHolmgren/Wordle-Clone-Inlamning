import '../styles/HighscoreBoard.css';

function HighscoreBoard() {
  const scores = Array(10).fill({ name: 'Joe Doe', score: '1 min 2s' });

  const renderScores = scores.map((item, idx) => (
    <li key={idx}>
      Name: {item.name} - Score: {item.score}{' '}
    </li>
  ));

  return (
    <div className='containerHighScore'>
      <div className='scoreboard'>
        <ul>{renderScores}</ul>
      </div>
    </div>
  );
}

export default HighscoreBoard;
