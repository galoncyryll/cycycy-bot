const process = require('process');

module.exports.run = async (bot, message) => {
  if (message.member.id === '487797385691398145') {
    const Pepege = bot.emojis.find(emoji => emoji.name === 'Pepege');
    return message.channel.send(`Shutting down... ${Pepege}`)
      .then(() => bot.destroy())
      .then(() => process.exit())
      .catch(err => message.reply(`Error ${err}`));
  }
  return message.reply("You don't have a permission for this command.");
};

module.exports.help = {
  name: 'shutdown',
};
