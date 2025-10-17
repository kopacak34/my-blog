require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // slouží frontend přímo z tohoto adresáře

const Post = mongoose.model('Post', new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
}));

// Získání všech příspěvků
app.get('/api/posts', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

// Přidání nového příspěvku
app.post('/api/posts', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.json(post);
});

// Připojení k MongoDB a spuštění serveru
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => console.log('Server běží na portu', process.env.PORT)))
  .catch(err => console.error('Chyba MongoDB:', err));
