const mongoose = require('mongoose');
const Mod = require('../../models/modDBtest');

module.exports.run = async (bot, message, args, NaM) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Only administrator have permission for this command ${NaM}`);
    if(args[0] === "help") {
        return message.reply("```Usage: !=delmod```");
    }

    Mod.deleteOne({ serverID: message.guild.id }).then(res => {
        if(res.n >= 1) {
            return message.reply(`Mod role deleted ${NaM}`);
        } else {
            return message.reply(`Mod role is not set in this server`);
        }
    }).catch(err => message.reply(`Error ${err}`));
}

module.exports.help = {
    name : 'delmod'
}