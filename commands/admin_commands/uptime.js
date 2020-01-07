module.exports.run = async (bot, message) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You don't have a permission for this command.");
  bot.cooldown.add(message.author.id);
  setTimeout(() => {
    bot.cooldown.delete(message.author.id);
  }, 15000);
  let totalSeconds = (bot.uptime / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const upTime = `${days} days(${hours} hours, ${minutes} minutes and ${Math.trunc(seconds)} seconds)`;

  return message.channel.send('Pinging...')
    .then((m) => {
      const ping = m.createdTimestamp - message.createdTimestamp;

      m.edit(`\`Bot Latency:\` ${ping}ms, \`Uptime:\` ${upTime}`);
    }).catch(err => message.reply(err));
};

module.exports.help = {
  name: 'uptime',
};
