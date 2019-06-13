const mongoose = require('mongoose');

const leaveSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serverID: String,
    serverName: String,
    membersLeft: [String]
});


module.exports = mongoose.model("Leave", leaveSchema);