const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/posts', (req, res) => {
    res.json([{ id: 1, title: 'Meu Post', description: 'Descrição do post' }]);
});

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
