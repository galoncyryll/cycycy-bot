const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(args[0] === "help") {
        message.channel.send("```Usage: !=catfact```");
        return;
    }
    bot.cooldown.add(message.author.id);
    setTimeout(() => {
        bot.cooldown.delete(message.author.id);
    }, 15000);
    fetch('https://cat-fact.herokuapp.com/facts/random')
    .then(res => res.json())
    .then(fact => {
        let factEmbed = new Discord.RichEmbed()
        .setColor('#1fca05')
        .setDescription(fact.text);

        return message.channel.send(factEmbed);
    })
    .catch(err => message.reply(`Error ${err}`));
}

module.exports.help = {
    name : 'catfact'
}