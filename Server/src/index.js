const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./database');
const bcrypt = require('bcrypt');


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

app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  // Verificar se o usuário já existe
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao verificar o usuário.' });
    }
    if (row) {
      return res.status(400).json({ error: 'Email já registrado.' });
    }

    // Criptografar a senha
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.run(query, [username, email, hashedPassword], function (err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao criar o usuário.' });
      }
      res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    });
  });
});

// Rota POST para login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar o usuário.' });
    }
    if (!row) {
      return res.status(400).json({ error: 'Usuário não encontrado.' });
    }

    // Verificar a senha
    if (!bcrypt.compareSync(password, row.password)) {
      return res.status(400).json({ error: 'Senha incorreta.' });
    }

    // Gerar um token JWT
    const token = jwt.sign({ id: row.id, email: row.email }, 'seu_segredo', { expiresIn: '1h' });

    res.json({ message: 'Login bem-sucedido!', token });
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
