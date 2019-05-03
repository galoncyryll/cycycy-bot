const Discord = require('discord.js');
const fs = require('fs');
const ms = require('ms');
let warns = JSON.parse(fs.readFileSync('./warnings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply("You don't have a permission for this command.");
    let warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!warnUser) return message.channel.send('User not found NaM');

    let warn;
}

module.exports.help = {
    name : 'warnlevel'
}