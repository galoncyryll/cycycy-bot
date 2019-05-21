const mongoose = require('mongoose');

const loggerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serverID: String,
    logChannelID: String,
    isEnabled: Boolean
});


module.exports = mongoose.model("Afk", afkSchema)