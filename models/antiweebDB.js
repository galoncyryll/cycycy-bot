const mongoose = require('mongoose');

const antiWeebSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  serverID: String,
  serverName: String,
  isEnabled: Boolean,
});


module.exports = mongoose.model('antiweeb', antiWeebSchema);
