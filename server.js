const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.static('public'));

// Připojení k MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Připojeno k MongoDB (news_db)'))
  .catch(err => console.error('❌ Chyba připojení k MongoDB:', err));

// Schéma a model pro články
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// API endpoint – načtení všech článků
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Chyba při načítání článků' });
  }
});

// Spuštění serveru
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server běží na portu ${PORT}`));
