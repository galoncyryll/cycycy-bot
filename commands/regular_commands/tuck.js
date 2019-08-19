const mongoose = require('mongoose');
const Afk = require('../../models/afkDB');

module.exports.run = async (bot, message, args, NaM) => {
  if (args[0] === 'help') {
    message.channel.send('```Usage: !=tuck <user>```');
    return;
  }
  const weirdChamp = bot.emojis.find(emoji => emoji.name === 'WeirdChamp');
  const tucked = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!tucked) return message.channel.send(`User not found ${NaM}`);

  Afk.find({ userID: tucked.id }).then((res) => {
    if (res[0].isTucked) {
      return message.reply(`Tucking the tucked ${weirdChamp}`);
    }
    Afk.updateOne({ userID: tucked.id }, { isTucked: true })
      .then(message.channel.send(`<@${message.author.id}> tucked ${tucked.displayName} to bed ${args[1] ? args[1] : NaM} 👉 🛏️`));
  });
};

module.exports.help = {
  name: 'tuck',
};
