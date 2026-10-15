const mongoose = require('mongoose');

const SpecialtySchema = new mongoose.Schema({
  name: { type: String, required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Specialty', SpecialtySchema);
