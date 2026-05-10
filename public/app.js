const messageEl = document.getElementById('message');

function register() {
  fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: document.getElementById('regUser').value,
      password: document.getElementById('regPass').value
    })
  })
    .then(res => res.text())
    .then(msg => messageEl.textContent = msg);
}

function login() {
  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: document.getElementById('loginUser').value,
      password: document.getElementById('loginPass').value
    })
  })
    .then(res => res.text())
    .then(msg => messageEl.textContent = msg);
}