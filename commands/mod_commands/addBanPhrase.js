const mongoose = require('mongoose');
const BanPhrase = require('../../models/banPhraseDB');

module.exports.run = async (bot, message, args, NaM) => {
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`You don't have permission for this command ${NaM}`);
    if(args[0] === "help") {
        message.channel.send("```Usage: !=addbanphrase <word>```");
        return;
    }
    let bp = args.join(' ');
    if(!bp) return message.reply(`Please add a word to be banned ${NaM}`);

    const banphrase = new BanPhrase({
        _id: mongoose.Types.ObjectId(),
        serverID: message.guild.id,
        banphrase: bp
    });
    BanPhrase.find({ serverID: message.guild.id, banphrase: bp }).then(serverRes => {
        if (serverRes.length >= 1) {
            return message.channel.send('Banphrase already exists');
        } else {
            return banphrase.save().then(message.channel.send('Banphrase added')).catch(console.log);
        }
    });
}

module.exports.help = {
    name : 'addbanphrase'
}