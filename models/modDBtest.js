const mongoose = require('mongoose');

const modSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serverID: String,
    modName: String
});


module.exports = mongoose.model("Mod", modSchema)