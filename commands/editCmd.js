const mongoose = require('mongoose');
const Cmd = require('../models/customCommandsDB');

module.exports.run = async (bot, message, args, NaM) => {
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`You don't have permission for this command ${NaM}`);
    if(args[0] === "help") {
        message.channel.send("```Usage: !=editcmd <command name>```");
        return;
    }
    let cmdRes = args.slice(1);
    if(!args[0]) return message.reply(`Please add a command name ${NaM}`);
    if(!cmdRes) return message.reply(`Please add a command response ${NaM}`);
    
    Cmd.updateOne({ serverID: message.guild.id, commandName: args[0] },
            { commandRes: cmdRes.join(' ') }
        ).then(message.channel.send(`Command was changed ${NaM}`)).catch(console.log)
}

module.exports.help = {
    name : 'editcmd'
}