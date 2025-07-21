const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  photos: [String]
});

module.exports = mongoose.model('Category', categorySchema);
