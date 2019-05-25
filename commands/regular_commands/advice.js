const Discord = require('discord.js');


module.exports.run = async (bot, message, args, NaM) => {
    const OMGScoots = bot.emojis.find(emoji => emoji.name === "OMGScoots");

    fetch(`https://api.adviceslip.com/advice`)
    .then(res => res.json())
    .then(res => {
        let cookieEmbed = new Discord.RichEmbed()
        .setColor(3447003)
        .addField(`${message.author.username} here is your advice ${OMGScoots}`, res.slip.advice);
        message.channel.send(cookieEmbed);
    })
    .catch(err => message.reply(`Error ${err}`));
}

module.exports.help = {
    name : 'advice'
}