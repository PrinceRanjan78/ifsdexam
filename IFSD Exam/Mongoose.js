const mongoose = require('mongoose');
const prompt = require('prompt-sync')();

// Connection URI
const uri = 'mongodb+srv://ranjanpbsc22:s4YvcCDEzWJfCPk1@prince.kcshohv.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
    main();
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Player Schema
const playerSchema = new mongoose.Schema({
  name: String,
  score: Number
});

// Player Model
const Player = mongoose.model('Player', playerSchema);

async function createPlayer() {
  const name = prompt('Enter the name of the player: ');
  const score = parseInt(prompt('Enter the score of the player: '));

  const player = new Player({ name, score });

  await player.save();
  console.log('Player created successfully.');
}

async function readPlayers() {
  console.log('Reading players...');

  const players = await Player.find();

  for (const player of players) {
    console.log(`Name: ${player.name}, Score: ${player.score}`);
  }
}

async function updatePlayer() {
  const nameToUpdate = prompt('Enter the name of the player to update: ');

  const player = await Player.findOne({ name: nameToUpdate });

  if (!player) {
    console.log('Player not found.');
    return;
  }

  const newScore = parseInt(prompt('Enter the new score of the player: '));
  player.score = newScore;

  await player.save();
  console.log('Player updated successfully.');
}

async function deletePlayer() {
  const nameToDelete = prompt('Enter the name of the player to delete: ');

  const result = await Player.deleteOne({ name: nameToDelete });

  if (result.deletedCount > 0) {
    console.log('Player deleted successfully.');
  } else {
    console.log('Player not found.');
  }
}

async function calculateAverageScore() {
  const players = await Player.find();
  let totalScore = 0;

  for (const player of players) {
    totalScore += player.score;
  }

  const averageScore = totalScore / players.length;
  console.log(`Average score of all players: ${averageScore}`);
}

async function findMinimumScore() {
  const player = await Player.findOne().sort({ score: 1 });
  console.log(`Player with the minimum score: Name: ${player.name}, Score: ${player.score}`);
}

async function findMaximumScore() {
  const player = await Player.findOne().sort({ score: -1 });
  console.log(`Player with the maximum score: Name: ${player.name}, Score: ${player.score}`);
}

async function main() {
  const numberOfPlayers = parseInt(prompt('Enter the number of players: '));

  for (let i = 0; i < numberOfPlayers; i++) {
    await createPlayer();
  }

  await readPlayers();
  await updatePlayer();
  await deletePlayer();

  await calculateAverageScore();
  await findMinimumScore();
  await findMaximumScore();

  // Close the MongoDB connection
  mongoose.connection.close();
  console.log('Connection closed');
}
