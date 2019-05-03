const mongoose = require('mongoose');

const banPhraseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serverID: String,
    banphrase: String
});


module.exports = mongoose.model("BanPhrase", banPhraseSchema);