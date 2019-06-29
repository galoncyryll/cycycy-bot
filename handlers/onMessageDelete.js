const Discord = require('discord.js');
const bot = require('../bot');
const db = require('../settings/databaseImport');

bot.on('messageDelete', async (message) => {
  const logger = (logArgs) => {
    db.Logger.findOne({ serverID: message.guild.id }).then((logRes) => {
      if (logRes.isEnabled && logRes.isEnabled === 'enable') {
        const logEmbed = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(`[MESSAGE_DELETE] | ${message.author.username}`, message.author.avatarURL)
          .addField('User', `<@${message.author.id}>`, true)
          .addField('Reason', logArgs, true)
          .addField('Message', message.content)
          .setFooter(`MESSAGE ID: ${message.id}`)
          .setTimestamp();

        return bot.channels.get(logRes.logChannelID).send(logEmbed);
      }
    }).catch(console.log);
  };

  db.BanPhrase.find({ serverID: message.guild.id }).then((banPhrase) => {
    let bpIdentifier = false;
    banPhrase.forEach((banPhraseItems) => {
      if (message.content.toUpperCase().includes(banPhraseItems.banphrase.toUpperCase())) {
        bpIdentifier = true;
        return logger(`Match ban phrase: **${banPhraseItems.banphrase}**`);
      }
    });
    if (bpIdentifier) {

    } else {
      return logger('Message deleted');
    }
  });
});
