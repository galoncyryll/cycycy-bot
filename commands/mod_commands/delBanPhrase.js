const mongoose = require('mongoose');
const BanPhrase = require('../../models/banPhraseDB');

module.exports.run = async (bot, message, args, NaM) => {
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`You don't have permission for this command ${NaM}`);
    if(args[0] === "help") {
        message.channel.send("```Usage: !=delbanphrase <word>```");
        return;
    }
    let bp = args.join(' ');
    if(!bp) return message.reply(`Please add a word to be unbanned ${NaM}`);

    BanPhrase.deleteOne({ serverID: message.guild.id, banphrase: bp }).then(res => {
        if(res.n >= 1){
            message.reply(`The ban phrase "${bp}" has been deleted ${NaM}`);
        } else {
            message.reply(`Ban phrase doesn't exist ${NaM}`);
        }
    })  
}

module.exports.help = {
    name : 'delbanphrase'
}