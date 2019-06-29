const mongoose = require('mongoose');

const afkSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: String,
  reason: String,
  date: Date,
  afkType: String,
});


module.exports = mongoose.model('Afk', afkSchema);
