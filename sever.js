const express = require('express');
const db = require('./database');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Register API
 */
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, password],
    function (err) {
      if (err) {
        return res.send('Username already exists');
      }
      res.send('Registration successful');
    }
  );
});

/**
 * Login API
 */
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (err, user) => {
      if (!user) {
        return res.send('User not found');
      }

      if (user.password !== password) {
        return res.send('Incorrect password');
      }

      res.send('Login successful');
    }
  );
});

// Start server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});