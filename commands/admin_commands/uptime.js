module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You don't have a permission for this command.");
  let totalSeconds = (bot.uptime / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const upTime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

  return message.reply(`I have been running for ${upTime}`);
};

module.exports.help = {
  name: 'uptime',
};
