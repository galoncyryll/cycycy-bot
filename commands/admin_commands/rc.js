module.exports.run = async (bot, message, args, NaM) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`You don't have permission for this command ${NaM}`);
  const role = args.join(' ');
  const roleFinder = message.guild.roles.find(r => r.name === role);
  if (roleFinder) {
    const roleSize = message.guild.roles.get(roleFinder.id).members;
    if (roleSize) return message.channel.send(`${role} has ${roleSize.size} members in this server`);
  } else {
    return message.channel.send(`Role not found ${NaM}`);
  }
};

module.exports.help = {
  name: 'rc',
};
