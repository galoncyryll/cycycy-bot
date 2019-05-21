const mongoose = require('mongoose');

const loggerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serverID: String,
    logChannelID: String,
    isEnabled: String
});


module.exports = mongoose.model("Logger", loggerSchema);