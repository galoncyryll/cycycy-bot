const mongoose = require('mongoose');

const customCommandsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serverID: String,
    serverName: String,
    commandName: String,
    commandRes: String
});

module.exports = mongoose.model("customCommands", customCommandsSchema)