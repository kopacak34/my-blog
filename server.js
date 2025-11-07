const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Připojení k MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB (news_db)'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Schéma a model pro příspěvky
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// API endpointy
// 1️⃣ Získání všech příspěvků
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Chyba při načítání příspěvků' });
  }
});

// 2️⃣ Přidání nového příspěvku
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Chybí titulek nebo obsah' });
    }
    const post = new Post({ title, content });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Chyba při ukládání příspěvku' });
  }
});

// Spuštění serveru
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
