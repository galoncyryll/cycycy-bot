module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply("You don't have a permission for this command.");
  const warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!warnUser) return message.channel.send('User not found NaM');
};

module.exports.help = {
  name: 'warnlevel',
};
