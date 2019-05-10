const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const forHEad = bot.emojis.find(emoji => emoji.name === "4HEad");
    let botEmbed = new Discord.RichEmbed()
    .setDescription('Bot Information')
    .setColor('#00b22c')
    .setThumbnail(bot.user.displayAvatarURL)
    .addField(bot.user.username, `Multi-purpose bot for discord ${forHEad}`)
    .addField('Created On', bot.user.createdAt)
    .setFooter('Bot made by cycycy | github repo: github.com/galoncyryll/cycycy-bot', bot.user.displayAvatarURL);

    return message.channel.send(botEmbed);
}

module.exports.help = {
    name : 'botinfo'
}