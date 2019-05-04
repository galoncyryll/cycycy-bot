const Discord = require('discord.js');


module.exports.run = async (bot, message, args, NaM) => {
    // if (bot.cooldown.has(message.author.id)) {
    //     return message.channel.send(`You can only use this command once per 24hrs`);
    // } else {

    //     // the user can type the command ... your command code goes here :)

    //     // Adds the user to the set so that they can't talk for a minute
    //     bot.cooldown.add(message.author.id);
    //     setTimeout(() => {
    //     // Removes the user from the set after a minute
    //     bot.cooldown.delete(message.author.id);
    //     }, 86400000); 
    // }
    fetch(`https://api.adviceslip.com/advice`)
    .then(res => res.json())
    .then(res => {
        let cookieEmbed = new Discord.RichEmbed()
        .setColor(3447003)
        .addField(`📖 ${message.author.username} here is your advice`, res.slip.advice);
        message.channel.send(cookieEmbed);
    })
    .catch(console.log);
}

module.exports.help = {
    name : 'advice'
}