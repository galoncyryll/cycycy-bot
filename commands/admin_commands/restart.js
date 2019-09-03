module.exports.run = async (bot, message) => {
  if (message.member.id === '487797385691398145') {
    const Pepega = bot.emojis.find(emoji => emoji.name === 'Pepege');
    return message.channel.send(`Restarting... ${Pepega}`)
      .then(bot.destroy())
      .then(() => bot.login(process.env.BOT_TOKEN))
      .catch(err => message.reply(`Error ${err}`));
  }
  return message.reply("You don't have a permission for this command.");
};

module.exports.help = {
  name: 'restart',
};
