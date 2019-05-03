const mongoose = require('mongoose');

const afkSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    reason: String,
    date: Date
});


module.exports = mongoose.model("Afk", afkSchema)