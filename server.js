const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

console.log('Mongo URI:', process.env.MONGO_URI); // pro debug

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// API – získání všech příspěvků
app.get('/api/posts', async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.json(posts);
});

// API – přidání příspěvku
app.post('/api/posts', async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content });
  await post.save();
  res.json(post);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
