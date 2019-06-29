module.exports.run = async (bot, message, NaM) => {
  const PepegaPls = bot.emojis.find(emoji => emoji.name === 'PepegaPls');
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`You don't have a permission for this command. ${NaM}`);
  return message.channel.send(`RUNNING ${PepegaPls}`);
};

module.exports.help = {
  name: 'test',
};
