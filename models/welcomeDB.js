const mongoose = require('mongoose');

const welcomeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  serverID: String,
  serverName: String,
  isEnabled: Boolean,
  welcomeChannel: String,
  welcomeMsg: String,
});

module.exports = mongoose.model('welcome', welcomeSchema);
