const mongoose = require('mongoose');

const modSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serverID: String,
    serverName: String,
    modName: String
});


module.exports = mongoose.model("Mod", modSchema)