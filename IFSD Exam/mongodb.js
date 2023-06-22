const { MongoClient } = require('mongodb');
const prompt = require('prompt-sync')();

// Connection URI
const uri = 'mongodb+srv://ranjanpbsc22:s4YvcCDEzWJfCPk1@prince.kcshohv.mongodb.net/?retryWrites=true&w=majority';

// Database Name
const dbName = 'Team_PlayerDB';

// Collection Name
const collectionName = 'TPlayers';

class TeamPlayer {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

async function createPlayer(collection) {
  const name = prompt('Enter the name of the player: ');
  const score = parseInt(prompt('Enter the score of the player: '));
  const player = new TeamPlayer(name, score);

  // Insert player into the collection
  await collection.insertOne(player);
  console.log('Player created successfully.');
}

async function readPlayers(collection) {
  console.log('Reading players...');

  // Find all players in the collection
  const players = await collection.find().toArray();

  for (const player of players) {
    console.log(`Name: ${player.name}, Score: ${player.score}`);
  }
}

async function updatePlayer(collection) {
  const nameToUpdate = prompt('Enter the name of the player to update: ');
  const newScore = parseInt(prompt('Enter the new score of the player: '));

  // Update the player with the given name
  const result = await collection.updateOne({ name: nameToUpdate }, { $set: { score: newScore } });

  if (result.modifiedCount > 0) {
    console.log('Player updated successfully.');
  } else {
    console.log('Player not found.');
  }
}

async function deletePlayer(collection) {
  const nameToDelete = prompt('Enter the name of the player to delete: ');

  // Delete the player with the given name
  const result = await collection.deleteOne({ name: nameToDelete });

  if (result.deletedCount > 0) {
    console.log('Player deleted successfully.');
  } else {
    console.log('Player not found.');
  }
}

async function main() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to the database');

    // Access the teamDB database
    const db = client.db(dbName);

    // Access the players collection
    const collection = db.collection(collectionName);

    // Perform CRUD operations
    await createPlayer(collection);
    await readPlayers(collection);
    await updatePlayer(collection);
    await deletePlayer(collection);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the client connection
    await client.close();
    console.log('Connection closed');
  }
}

main();
