import React, { useState } from 'react';

function TeamPlayerStatsWidget() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [averageScore, setAverageScore] = useState(null);
  const [minimumScore, setMinimumScore] = useState(null);
  const [maximumScore, setMaximumScore] = useState(null);

  const handleAddPlayer = () => {
    const newPlayer = {
      name: name,
      score: parseInt(score)
    };

    setPlayers([...players, newPlayer]);
    setName('');
    setScore('');
  };

  const handleDeletePlayer = (index) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

  const handleCalculateStats = () => {
    if (players.length > 0) {
      const scores = players.map((player) => player.score);
      const sum = scores.reduce((total, score) => total + score, 0);
      const average = sum / players.length;
      const minimum = Math.min(...scores);
      const maximum = Math.max(...scores);

      setAverageScore(average);
      setMinimumScore(minimum);
      setMaximumScore(maximum);
    } else {
      setAverageScore(null);
      setMinimumScore(null);
      setMaximumScore(null);
    }
  };

  return (
    <div className="widget-container">
      <h3>Team Player Statistics</h3>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <button onClick={handleAddPlayer}>Add Player</button>
      </div>
      <button onClick={handleCalculateStats}>Calculate Statistics</button>
      {averageScore !== null && (
        <div>
          Average Score: {averageScore.toFixed(2)}
        </div>
      )}
      {minimumScore !== null && (
        <div>
          Minimum Score: {minimumScore}
        </div>
      )}
      {maximumScore !== null && (
        <div>
          Maximum Score: {maximumScore}
        </div>
      )}
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            {player.name} - Score: {player.score}
            <button onClick={() => handleDeletePlayer(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamPlayerStatsWidget;
