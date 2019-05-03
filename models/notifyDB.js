const mongoose = require('mongoose');

const notifySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    senderName: String,
    serverName: String,
    notifyMsg: String
});


module.exports = mongoose.model("Notify", notifySchema)