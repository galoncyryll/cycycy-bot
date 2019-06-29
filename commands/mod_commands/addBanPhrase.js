const mongoose = require('mongoose');
const BanPhrase = require('../../models/banPhraseDB');
const Mods = require('../../models/modDBtest');

module.exports.run = async (bot, message, args, NaM) => {
  if (args[0] === 'help') {
    message.channel.send('```Usage: !=addbanphrase <word>```');
    return;
  }

  Mods.findOne({ serverID: message.guild.id }).then((res) => {
    if (res) {
      const serverRole = message.guild.roles.get(res.modName);
      if (res.modName === serverRole.id && message.member.roles.has(serverRole.id) || message.member.hasPermission('ADMINISTRATOR')) {
        const bp = args.join(' ');
        if (!bp) return message.reply(`Please add a word to be banned ${NaM}`);

        const banphrase = new BanPhrase({
          _id: mongoose.Types.ObjectId(),
          serverID: message.guild.id,
          serverName: message.guild.name,
          banphrase: bp,
        });

        BanPhrase.find({ serverID: message.guild.id, banphrase: bp }).then((serverRes) => {
          if (serverRes.length >= 1) {
            return message.channel.send('Banphrase already exists');
          }
          return banphrase.save().then(message.channel.send('Banphrase added')).catch(err => message.reply(`Error ${err}`));
        });
      } else {
        return message.reply(`You don't have permission for this command ${NaM}`);
      }
    } else {
      return message.reply(`You haven't set a mod in this server ${NaM}. To set a mod in this server do !=setmod help.`);
    }
  }).catch(err => message.reply(`Error ${err}`));
};

module.exports.help = {
  name: 'addbanphrase',
};
