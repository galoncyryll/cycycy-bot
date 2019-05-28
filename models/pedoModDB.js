const mongoose = require('mongoose');

const pedoModSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serverID: String,
    serverName: String,
    userID: String,
    userName: String
});

module.exports = mongoose.model("PedoMod", pedoModSchema)