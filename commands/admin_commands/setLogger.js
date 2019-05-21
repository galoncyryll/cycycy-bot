const mongoose = require('mongoose');
const Logger = require('../../models/loggerDB');

module.exports.run = async (bot, message, args, NaM ) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Only administrator have permission for this command ${NaM}`);
    if(args[0] === "help") {
        return message.reply("```Usage: !=setlogger <enable/disable> <channel_id>```");
    }
    console.log(args[1]);
    // const logger = new Logger({
    //     _id: mongoose.Types.ObjectId(),
    //     serverID: message.guild.id,
    //     logChannelID: String,
    //     isEnabled: Boolean
    // });
}

module.exports.help = {
    name: 'setlogger'
}