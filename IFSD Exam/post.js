const express = require('express');
const prompt = require('prompt-sync')();

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Define the TeamPlayer class
class TeamPlayer {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

// Define the Team class
class Team {
  constructor(players) {
    this.players = players;
  }

  calculateAverageScore() {
    const sum = this.players.reduce((total, player) => total + player.score, 0);
    return sum / this.players.length;
  }

  findMinimumScore() {
    const scores = this.players.map(player => player.score);
    return Math.min(...scores);
  }

  findMaximumScore() {
    const scores = this.players.map(player => player.score);
    return Math.max(...scores);
  }
}

// In-memory data storage
let players = [];

// Handle POST request to add a player
app.post('/players', (req, res) => {
  try {
    const name = prompt('Enter the name of the player: ');
    const score = parseInt(prompt('Enter the score of the player: '));

    const player = new TeamPlayer(name, score);

    players.push(player);
    res.status(201).json({ message: 'Player added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add player' });
  }
});

// Handle GET request to fetch all players
app.get('/players', (req, res) => {
  try {
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

// Handle GET request to fetch player by index
app.get('/players/:index', (req, res) => {
  try {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < players.length) {
      res.json(players[index]);
    } else {
      res.status(404).json({ error: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch player' });
  }
});

// Handle PUT request to update player by index
app.put('/players/:index', (req, res) => {
  try {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < players.length) {
      const name = prompt('Enter the new name of the player: ');
      const score = parseInt(prompt('Enter the new score of the player: '));

      players[index].name = name;
      players[index].score = score;

      res.json({ message: 'Player updated successfully' });
    } else {
      res.status(404).json({ error: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update player' });
  }
});

// Handle DELETE request to delete player by index
app.delete('/players/:index', (req, res) => {
  try {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < players.length) {
      players.splice(index, 1);
      res.json({ message: 'Player deleted successfully' });
    } else {
      res.status(404).json({ error: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete player' });
  }
});

// Handle GET request to fetch player statistics
app.get('/statistics', (req, res) => {
  try {
    const team = new Team(players);
    const averageScore = team.calculateAverageScore();
    const minimumScore = team.findMinimumScore();
    const maximumScore = team.findMaximumScore();

    res.json({
      averageScore,
      minimumScore,
      maximumScore
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
