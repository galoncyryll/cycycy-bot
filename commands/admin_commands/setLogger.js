const mongoose = require('mongoose');
const Logger = require('../../models/loggerDB');

module.exports.run = async (bot, message, args, NaM) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Only administrator have permission for this command ${NaM}`);
  if (args[0] === 'help') {
    return message.reply('```Usage: $setlogger <enable/disable> <channel_name>(case sensitive)```');
  }
  const logChannelName = args[1];
  const channelFinder = message.guild.channels.find(channel => channel.name === logChannelName);
  const isEnabled = args[0];

  if (!isEnabled) return message.reply('Please add enable or disable. Use `$setlogger help` for setting the logger channel.');
  if (isEnabled === 'enable' && channelFinder) {
    const logger = new Logger({
      _id: mongoose.Types.ObjectId(),
      serverID: message.guild.id,
      serverName: message.guild.name,
      logChannelID: channelFinder.id,
      isEnabled,
    });

    Logger.findOne({ serverID: message.guild.id }).then((res) => {
      if (res) {
        return Logger.updateOne({ serverID: message.guild.id },
          { isEnabled, logChannelID: channelFinder.id, serverName: message.guild.name }).then(message.channel.send(`Logger channel has been set to ${channelFinder}`)).catch(err => message.reply(`Error ${err}`));
      }
      return logger.save().then(message.channel.send('Logger channel added successfully!')).catch(err => message.reply(`Error ${err}`));
    }).catch(err => message.reply(`Error ${err}`));
  } else if (isEnabled === 'disable') {
    Logger.findOne({ serverID: message.guild.id }).then((res) => {
      if (res) {
        return Logger.updateOne({ serverID: message.guild.id },
          { isEnabled, logChannelID: '' }).then(message.channel.send('Logger disabled successfully!')).catch(err => message.reply(`Error ${err}`));
      }
      return message.channel.send(`Logger has not been setup in this server yet${NaM}Please use \`$setlogger help\` for more info.`);
    }).catch(err => message.reply(`Error ${err}`));
  } else {
    return message.channel.send('An error has occured. Use `$setlogger help` for setting the logger channel.');
  }
};

module.exports.help = {
  name: 'setlogger',
};
