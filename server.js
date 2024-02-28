// Import modules
const express = require('express');
const bodyParser = require('body-parser');

// Creates an Express application
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

// Additional custom middleware
app.use((req, res, next) => {
  console.log(`Path accessed: ${req.path}`);
  next();
});

// Error-handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Sample data for users
const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' },
    { id: 4, name: 'Alice' },
    { id: 5, name: 'Charlie' },
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

// Sample data for posts
const posts = [
  { id: 1, title: 'Post 1', content: 'God knows' },
  { id: 2, title: 'Post 2', content: 'Programming is like sex' },
  { id: 3, title: 'Post 3', content: 'Copy-and-Paste' },
];

// GET route for posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// POST route for creating posts
app.post('/posts', (req, res) => {
  const newPost = req.body;
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Sample data for comments
const comments = [
  { id: 1, postId: 1, text: 'When I wrote this code, only God and I understood what I did. Now only God knows' },
  { id: 2, postId: 1, text: 'Programming is like sex: One mistake and you have to support it for the rest of your life' },
  { id: 3, postId: 2, text: 'Copy-and-Paste was programmed by programmers for programmers actually' },
];

// GET route for comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// POST route for creating comments
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  res.status(201).json(newComment);
});

// Starts the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
