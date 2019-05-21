const mongoose = require('mongoose');
const Logger = require('../../models/loggerDB');

module.exports.run = async (bot, message, args, NaM ) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Only administrator have permission for this command ${NaM}`);
    if(args[0] === "help") {
        return message.reply("```Usage: !=setlogger <enable/disable> <channel_id>```");
    }
    let logChannelName = args[1];
    let channelFinder = message.guild.channels.find(channel => channel.name === logChannelName);
    let isEnabled = args[0]
    
    if(!isEnabled) return message.reply('Please add enable or disable. Use `!=setlogger help` for setting the logger channel.');
    if(isEnabled === 'enable' && channelFinder) {
        const logger = new Logger({
            _id: mongoose.Types.ObjectId(),
            serverID: message.guild.id,
            logChannelID: channelFinder.id,
            isEnabled: isEnabled
        });
        
        Logger.findOne({ serverID: message.guild.id }).then(res => {
            if(res) {
                Logger.updateOne({ serverID: message.guild.id }, 
                    { isEnabled: isEnabled }).then(console.log('updated'))
            } else {
                return logger.save().then(message.channel.send(`Logger channel added successfully!`)).catch(console.log);
            }
        });
    } 
    
}

module.exports.help = {
    name: 'setlogger'
}