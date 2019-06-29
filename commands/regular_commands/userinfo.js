const Discord = require('discord.js');

module.exports.run = async (bot, message, args, NaM) => {
  const users = message.guild.member(message.mentions.users.first() || message.author);
  if (args[0] === 'help') {
    message.channel.send('```Usage: !=userinfo <user or blank>```');
    return;
  }
  if (!users) return message.channel.send(`User not found ${NaM}`);

  const userIcon = users.user.displayAvatarURL;
  const userEmbed = new Discord.RichEmbed()
    .setTitle(`${users.user.username} User ID: ${users.user.id}`)
    .setColor(message.guild.member(users).highestRole.color)
    .setThumbnail(userIcon)
    .addField('Game:', message.guild.member(users).presence.game ? message.guild.member(users).presence.game.name : 'Not Playing', true)
    .addField('Created on:', users.user.createdAt)
    .addField('Joined this server on:', users.joinedAt)
    .addField('Roles:', message.guild.member(users).roles.map(s => s).join(' | '), true);
  return message.channel.send(userEmbed);
};

module.exports.help = {
  name: 'userinfo',
};
