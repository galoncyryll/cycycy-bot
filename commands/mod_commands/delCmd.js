const Cmd = require('../../models/customCommandsDB');
const Mods = require('../../models/modDBtest');

module.exports.run = async (bot, message, args, NaM) => {
  if (args[0] === 'help') {
    message.channel.send('```Usage: !=delcmd <command name>```');
    return;
  }

  Mods.findOne({ serverID: message.guild.id }).then((res) => {
    if (res) {
      const serverRole = message.guild.roles.get(res.modName);
      if ((res.modName === serverRole.id && message.member.roles.has(serverRole.id)) || message.member.hasPermission('ADMINISTRATOR')) {
        if (!args[0]) return message.reply(`Please add a command name ${NaM}`);


        Cmd.deleteOne({ serverID: message.guild.id, commandName: args[0] }).then((cmdRes) => {
          if (cmdRes.n >= 1) {
            message.reply(`The command ${args[0]} has been deleted`);
          } else {
            message.reply(`Command doesn't exists ${NaM}`);
          }
        }).catch(err => message.reply(`Error ${err}`));
      } else {
        return message.reply(`You don't have permission for this command ${NaM}`);
      }
    } else {
      return message.reply(`You haven't set a mod in this server ${NaM}. To set a mod in this server do !=setmod help.`);
    }
  }).catch(err => message.reply(`Error ${err}`));
};

module.exports.help = {
  name: 'delcmd',
};
