const Discord = require('discord.js');


module.exports.run = async (bot, message, args, NaM) => {
    if (bot.cooldown.has(message.author.id)) {
        let newDate = new Date();
        let lastDate = bot.cooldown.get(message.author.id);
        let ms = newDate - lastDate;
        
        let timeRemaining = 86400000 - ms;
        let totalSecs = (timeRemaining / 1000);
        let timeRemainingHrs = Math.floor(totalSecs / 3600);
        totalSecs %= 3600;
        let timeRemainingMins = Math.floor(totalSecs / 60);
        let timeRemainingSecs = totalSecs % 60;

        return message.channel.send(`You can only use this command once per 24hrs (${timeRemainingHrs}hrs, ${timeRemainingMins}m and ${Math.trunc(timeRemainingSecs)}s)`);
    } else {
        let date = new Date()
        bot.cooldown.set(message.author.id, date);
        setTimeout(() => {
        bot.cooldown.delete(message.author.id);
        }, 86400000); 
    }
    fetch(`http://fortunecookieapi.herokuapp.com/v1/cookie`)
    .then(res => res.json())
    .then(res => {
        let cookieEmbed = new Discord.RichEmbed()
        .setColor(3447009)
        .addField(`🍪 ${message.author.username} here is your cookie for the day`, res[0].fortune.message);
        message.channel.send(cookieEmbed);
    })
    .catch(err => message.reply(`Error ${err}`));
}

module.exports.help = {
    name : 'cookie'
}