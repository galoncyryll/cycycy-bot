const mongoose = require('mongoose');
const PedoMod = require('../../models/pedoModDB');

module.exports.run = async (bot, message, args, NaM) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Only administrator have permission for this command ${NaM}`);
    if(args[0] === "help") {
        return message.reply("```Usage: !=delweebmod <user>```");
    }

    let weebMod = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!weebMod) return message.channel.send(`User not found ${NaM}`);

    PedoMod.deleteOne({ serverID: message.guild.id, userID: weebMod.id }).then(pedoRes => {
        if(pedoRes.n >= 1) {
            return message.reply(`Weeb mod ${weebMod.user.username} deleted ${NaM}`);
        } else {
            return message.reply(`Weeb mod not found`);
        }
    }).catch(err => message.reply(`Error ${err}`));
}

module.exports.help = {
    name : 'delmod'
}