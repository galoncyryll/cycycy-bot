module.exports.run = async (bot, message, NaM) => {
  const KEKW = bot.emojis.find(emoji => emoji.name === 'KEKW');
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`You don't have a permission for this command. ${NaM}`);
  return message.channel.send(`PINGING ${KEKW}`);
};

module.exports.help = {
  name: 'ping',
};
