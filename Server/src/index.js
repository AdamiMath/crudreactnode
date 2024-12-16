const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./database'); // Importa o banco de dados

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rota GET para listar os posts
app.get('/api/posts', (req, res) => {
  db.all('SELECT * FROM posts', [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar os posts:', err.message);
      res.status(500).json({ error: 'Erro ao buscar os posts' });
    } else {
      res.json(rows);
    }
  });
});

// Rota POST para criar um novo post
app.post('/api/posts', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Título e descrição são obrigatórios.' });
  }

  const query = 'INSERT INTO posts (title, description) VALUES (?, ?)';
  const params = [title, description];

  db.run(query, params, function (err) {
    if (err) {
      console.error('Erro ao criar o post:', err.message);
      res.status(500).json({ error: 'Erro ao criar o post' });
    } else {
      res.status(201).json({ id: this.lastID, title, description });
    }
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
