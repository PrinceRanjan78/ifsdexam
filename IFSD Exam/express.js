const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;
const mongoUrl = 'mongodb+srv://ranjanpbsc22:s4YvcCDEzWJfCPk1@prince.kcshohv.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'TPlayer';

app.use(express.json());

// Create a new player and store it in the database
app.post('/api/players', (req, res) => {
  const player = req.body;

  MongoClient.connect(mongoUrl, (err, client) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      res.status(500).json({ error: 'Failed to connect to the database' });
      return;
    }

    const db = client.db(dbName);
    const playersCollection = db.collection('players');

    playersCollection.insertOne(player, (err, result) => {
      if (err) {
        console.error('Error inserting player:', err);
        res.status(500).json({ error: 'Failed to insert player into the database' });
        return;
      }

      res.status(201).json({ message: 'Player created successfully' });
      client.close();
    });
  });
});

// Retrieve all players from the database
app.get('/api/players', (req, res) => {
  MongoClient.connect(mongoUrl, (err, client) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      res.status(500).json({ error: 'Failed to connect to the database' });
      return;
    }

    const db = client.db(dbName);
    const playersCollection = db.collection('players');

    playersCollection.find().toArray((err, players) => {
      if (err) {
        console.error('Error retrieving players:', err);
        res.status(500).json({ error: 'Failed to retrieve players from the database' });
        return;
      }

      res.json(players);
      client.close();
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
