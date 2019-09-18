const Welcome = require('../../models/welcomeDB');

module.exports.run = async (bot, message, args, NaM) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Only administrator have permission for this command ${NaM}`);
  if (args[0] === 'help') {
    return message.reply('```Usage: $setwelcomemsg <enable/disable> <channel_name> <welcome_msg>```');
  }

  const logChannelName = args[1];
  const channelFinder = message.guild.channels.find(channel => channel.name === logChannelName);
  const welcomeMsg = args.slice(2).join(' ');
  let isEnabled = false;

  if (!channelFinder) return message.channel.send(`Channel not found ${NaM}`);

  if (args[0] === 'enable') {
    isEnabled = true;
  } else if (args[0] === 'disable') {
    isEnabled = false;
  } else {
    isEnabled = null;
  }

  if (isEnabled === null) return message.reply('Please add enable or disable. Use `$setwelcomemsg help` for setting the logger channel.');

  if (isEnabled && welcomeMsg) {
    Welcome.findOneAndUpdate(
      { serverID: message.guild.id },
      {
        serverName: message.guild.name,
        welcomeChannel: channelFinder.id,
        isEnabled,
        welcomeMsg,
      },
      {
        upsert: true,
        new: true,
        useFindAndModify: false,
        setDefaultsOnInsert: true,
      },
      (err, result) => {
        if (err) return message.channel.send(`Something went wrong: ${err}`);
        if (result) {
          return message.channel.send(`Welcome message set successfully ${NaM}`);
        }
      },
    );
  } else if (!isEnabled) {
    Welcome.findOneAndUpdate(
      { serverID: message.channel.id },
      {
        serverName: message.guild.name,
        isEnabled,
        welcomeMsg: '',
      },
      {
        upsert: true,
        new: true,
        useFindAndModify: false,
        setDefaultsOnInsert: true,
      },
      (err, result) => {
        if (err) return message.channel.send(`Something went wrong: ${err}`);
        if (result) {
          return message.channel.send(`Welcome message disabled ${NaM}`);
        }
      },
    );
  }
};

module.exports.help = {
  name: 'setwelcomemsg',
};
