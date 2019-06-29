module.exports.run = async (bot, message) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`You don't have a permission for this command. ${NaM}`);
  return message.channel.send(`${bot.user.username} is online! on ${bot.guilds.size} servers! 1`);
};

module.exports.help = {
  name: 'stats',
};
