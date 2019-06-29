const mongoose = require('mongoose');

const loggerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  serverID: String,
  serverName: String,
  logChannelID: String,
  isEnabled: String,
  leaveQueueLimit: Number,
});


module.exports = mongoose.model('Logger', loggerSchema);
