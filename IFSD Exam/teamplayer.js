const prompt = require('prompt-sync')();

class TeamPlayer {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

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

function main() {
  const numberOfPlayers = parseInt(prompt('Enter the number of players: '));
  const players = [];

  for (let i = 0; i < numberOfPlayers; i++) {
    const name = prompt(`Enter the name of player ${i + 1}: `);
    const score = parseInt(prompt(`Enter the score of player ${i + 1}: `));
    const player = new TeamPlayer(name, score);
    players.push(player);
  }

  const team = new Team(players);
  const averageScore = team.calculateAverageScore();
  const minimumScore = team.findMinimumScore();
  const maximumScore = team.findMaximumScore();

  console.log(`Average score: ${averageScore}`);
  console.log(`Minimum score: ${minimumScore}`);
  console.log(`Maximum score: ${maximumScore}`);
}

main();
