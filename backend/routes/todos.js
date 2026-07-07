const express = require('express');
const router = express.Router();

let todos = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.json(todos);
});

router.post('/', (req, res) => {
  const { text } = req.body || {};
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Todo text is required.' });
  }

  const todo = {
    id: nextId++,
    text: text.trim(),
    completed: false
  };

  todos.push(todo);
  res.status(201).json(todo);
});

router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found.' });
  }

  todo.completed = !todo.completed;
  res.json(todo);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found.' });
  }

  const [removed] = todos.splice(index, 1);
  res.json(removed);
});

module.exports = router;
