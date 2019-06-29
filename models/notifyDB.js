const mongoose = require('mongoose');

const notifySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  userID: String,
  senderName: String,
  senderAvatar: String,
  serverName: String,
  notifyMsg: String,
  date: Date,
});


module.exports = mongoose.model('Notify', notifySchema);
