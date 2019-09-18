const Afk = require('../../models/afkDB');

module.exports.run = async (bot, message, args, NaM) => {
  if (args[0] === 'help') {
    message.channel.send('```Usage: $tuck <user>```');
    return;
  }
  const weirdChamp = bot.emojis.find(emoji => emoji.name === 'WeirdChamp');
  const tucked = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!tucked) return message.channel.send(`User not found ${NaM}`);
  if (tucked.id === message.author.id) return message.reply(`You can't tuck yourself ${weirdChamp}`);

  Afk.find({ userID: tucked.id }).then((res) => {
    if (res.length >= 1) {
      if (res[0].isTucked) {
        return message.reply(`Tucking the tucked ${weirdChamp}`);
      } if (!res[0].isTucked) {
        return Afk.updateOne({ userID: tucked.id }, { isTucked: true, tucker: message.author.username })
          .then(message.channel.send(`<@${message.author.id}> tucked ${tucked.displayName} to bed ${args[1] ? args[1] : NaM} 👉 🛏️`));
      }
    } else {
      return message.reply(`${tucked.displayName} is not even asleep ${weirdChamp}`);
    }
  });
};

module.exports.help = {
  name: 'tuck',
};
