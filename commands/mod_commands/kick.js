const Mods = require('../../models/modDBtest');

module.exports.run = async (bot, message, args, NaM) => {
  const toKick = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (args[0] === 'help') {
    return message.reply('Usage: !=kick <user>');
  }

  Mods.findOne({ serverID: message.guild.id }).then((res) => {
    if (res) {
      const serverRole = message.guild.roles.get(res.modName);
      const PepeS = bot.emojis.find(emoji => emoji.name === 'PepeS');
      const joinedArgs = args.slice(1).join(' ');
      if ((res.modName === serverRole.id && message.member.roles.has(serverRole.id)) || message.member.hasPermission('ADMINISTRATOR')) {
        if (!toKick) return message.channel.send(`User not found ${NaM}`);
        if (toKick.id === '487797385691398145') {
          return message.reply(`Can't mute my master ${PepeS}`);
        } if (toKick.hasPermission('ADMINISTRATOR')) {
          return message.reply(`Can't mute administrator ${NaM}`);
        } if (message.member.id === '487797385691398145') {
          console.log('owner command'); // command for cycycy(owner)
        } else if (res.modName === serverRole.id && toKick.roles.has(serverRole.id)) {
          return message.reply(`Can't mute a mod ${NaM}`);
        }

        return toKick.kick(joinedArgs);
      }
      return message.reply(`You don't have permission for this command ${NaM}`);
    }
    return message.reply(`You haven't set a mod in this server ${NaM}. To set a mod in this server do !=setmod help.`);
  }).catch(err => message.reply(`Error ${err}`));
};

module.exports.help = {
  name: 'kick',
};
