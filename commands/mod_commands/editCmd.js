const Cmd = require('../../models/customCommandsDB');
const Mods = require('../../models/modDBtest');

module.exports.run = async (bot, message, args, NaM) => {
  if (args[0] === 'help') {
    message.channel.send('```Usage: !=editcmd <command name>```');
    return;
  }

  Mods.findOne({ serverID: message.guild.id }).then((res) => {
    if (res) {
      const serverRole = message.guild.roles.get(res.modName);
      if ((res.modName === serverRole.id && message.member.roles.has(serverRole.id)) || message.member.hasPermission('ADMINISTRATOR')) {
        const cmdRes = args.slice(1);
        if (!args[0]) return message.reply(`Please add a command name ${NaM}`);
        if (!cmdRes) return message.reply(`Please add a command response ${NaM}`);

        Cmd.updateOne({ serverID: message.guild.id, commandName: args[0] },
          { commandRes: cmdRes.join(' ') }).then(message.channel.send(`Command was changed ${NaM}`)).catch(err => message.reply(`Error ${err}`));
      } else {
        return message.reply(`You don't have permission for this command ${NaM}`);
      }
    } else {
      return message.reply(`You haven't set a mod in this server ${NaM}. To set a mod in this server do !=setmod help.`);
    }
  }).catch(err => message.reply(`Error ${err}`));
};

module.exports.help = {
  name: 'editcmd',
};
