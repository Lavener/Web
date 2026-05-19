// api/index.js
const express = require('express');
const db = require('../database');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, password],
    function (err) {
      if (err) return res.send('Username already exists');
      res.send('Registration successful');
    }
  );
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (err, user) => {
      if (!user) return res.send('User not found');
      if (user.password !== password) return res.send('Incorrect password');
      res.send('Login successful');
    }
  );
});

module.exports = app;