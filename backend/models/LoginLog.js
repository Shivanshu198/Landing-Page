const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema({
  email: { type: String, required: true },
  status: { type: String, enum: ['success', 'failure'], required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LoginLog', loginLogSchema);
