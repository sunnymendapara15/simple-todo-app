const express = require('express');
const cors = require('cors');
const todosRouter = require('./routes/todos');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/todos', todosRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Todo backend listening on port ${PORT}`);
});
