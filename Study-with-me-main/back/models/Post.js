const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  study: { type: mongoose.Schema.Types.ObjectId, ref: 'Study', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, enum: ['NOTICE', 'QNA', 'FREE'], required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
