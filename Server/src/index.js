const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./database'); // Arquivo SQLite fornecido

const app = express();
const SECRET_KEY = 'seu_segredo_super_secreto'; // Substitua por uma chave segura!
app.use(cors());
app.use(bodyParser.json());


app.post('/api/auth/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  
  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  // Verifique se a role é válida
  if (!['master', 'admin', 'user'].includes(role)) {
    return res.status(400).json({ error: 'Role inválida.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`,
      [username, email, hashedPassword, role],
      function (err) {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Erro ao registrar o usuário.' });
        }
        res.status(201).json({ id: this.lastID, username, email, role });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erro no servidor.' });
  }
});

// Endpoint para login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  db.get(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Erro no servidor.' });
      }
      if (!user) {
        return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
      } else {
        return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
      }
    }
  );
});

// Middleware para verificar JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido.' });
    }
    req.user = user;
    next();
  });
};

// Rota para criar um novo post
app.post('/api/posts', authenticateJWT, (req, res) => {
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

// Rota para obter posts (protegida)
app.get('/api/posts', authenticateJWT, (req, res) => {
  db.all('SELECT * FROM posts', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro no servidor.' });
    }
    res.json(rows);
  });
});

// Inicializa o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000.');
});

