
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  instructions: { type: String, required: true },
  filePath: { type: String }
});

module.exports = mongoose.model('Recipe', recipeSchema);
