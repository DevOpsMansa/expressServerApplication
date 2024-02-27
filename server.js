// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Use middleware for parsing JSON and handling URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Custom Middleware 1
app.use((req, res, next) => {
  console.log(`Request received at ${new Date()}`);
  next();
});

// Custom Middleware 2
app.use((req, res, next) => {
  console.log(`Request method: ${req.method}`);
  next();
});

// Error-handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Sample data
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
];

// GET route for users
app.get('/users', (req, res) => {
  // Apply query parameters for filtering if provided
  const filteredUsers = req.query.name ? users.filter(user => user.name === req.query.name) : users;

  res.json(filteredUsers);
});

// POST route for creating users
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// PATCH route for updating user information
app.patch('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;

  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    res.json(users[userIndex]);
  } else {
    res.status(404).send('User not found');
  }
});

// DELETE route for deleting users
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser);
  } else {
    res.status(404).send('User not found');
  }
});

// Render a simple view with a form
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/dashboard', (req, res) => {
  res.render('dashboard', { users });
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
