const mongoose = require('mongoose');
const PedoMod = require('../../models/pedoModDB');

module.exports.run = async (bot, message, args, NaM) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Only administrator have permission for this command ${NaM}`);
    if(args[0] === "help") {
        message.channel.send("```Usage: !=setweebmod <user>```");
        return;
    }
    let weebMod = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!weebMod) return message.channel.send(`User not found ${NaM}`);
    const DansGame = bot.emojis.find(emoji => emoji.name === "DansGame");

    const pedomod = new PedoMod({
        _id: mongoose.Types.ObjectId(),
        serverID: message.guild.id,
        serverName: message.guild.name,
        userID: weebMod.id,
        userName: weebMod.user.username
    });

    PedoMod.find({ serverID: message.guild.id, userID: weebMod.id }).then(pedoRes => {
        if (pedoRes.length >= 1) {
            return message.channel.send(`User ${weebMod.user.username} is already a weeb mod ${NaM}`);
        } else {
            return pedomod.save().then(message.channel.send(`Pedo master added ${DansGame}`)).catch(err => message.reply(`Error ${err}`));
        }
    });
}

module.exports.help = {
    name : 'setweebmod'
}