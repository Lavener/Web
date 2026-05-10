console.log('🚀 Running');

const express = require('express');
const sqlite3 = require('sqlite3');


console.log('✅ express loaded');
console.log('✅ sqlite3 loaded');

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run('CREATE TABLE test (id INT)');
  console.log('✅ SQLite works!');
});

const app = express();
app.get('/', (req, res) => res.send('OK'));
app.listen(3000, () => console.log('✅ Express running on http://localhost:3000'));