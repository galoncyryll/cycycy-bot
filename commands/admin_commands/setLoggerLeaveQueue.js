const Logger = require('../../models/loggerDB');

module.exports.run = async (bot, message, args, NaM) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Only administrator have permission for this command ${NaM}`);
  if (args[0] === 'help') {
    return message.reply('```Usage: !=setleavequeue <integer/number>```');
  }
  const leaveLimit = args[0];

  if (!leaveLimit) return message.reply('Please add limit argument. Use `!=setleavequeue help` for setting the queue limit.');
  Logger.findOne({ serverID: message.guild.id }).then((res) => {
    if (res && res.isEnabled === 'enable') {
      return Logger.updateOne({ serverID: message.guild.id },
        { leaveQueueLimit: leaveLimit }).then(message.reply(`Bot will log who leaves the server when limit is reached: **${leaveLimit}**`)).catch(err => message.reply(`Error ${err}`));
    }
    return message.channel.send(`Logger has not been setup in this server yet${NaM}Please use \`!=setlogger help\` for more info.`);
  }).catch(err => message.reply(`Error ${err}`));
};

module.exports.help = {
  name: 'setleavequeue',
};
