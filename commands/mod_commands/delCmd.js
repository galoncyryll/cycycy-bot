const mongoose = require('mongoose');
const Cmd = require('../../models/customCommandsDB');

module.exports.run = async (bot, message, args, NaM) => {
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`You don't have permission for this command ${NaM}`);
    if(args[0] === "help") {
        message.channel.send("```Usage: !=delcmd <command name>```");
        return;
    }
    let cmdRes = args.slice(1);
    if(!args[0]) return message.reply(`Please add a command name ${NaM}`);
    
    
    Cmd.deleteOne({ serverID: message.guild.id, commandName: args[0] }).then(res => {
        if(res.n >= 1){
            message.reply(`The command ${args[0]} has been deleted`);
        } else {
            message.reply(`Command doesn't exists ${NaM}`);
        }
    }).catch(console.log);
}

module.exports.help = {
    name : 'delcmd'
}