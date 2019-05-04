const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const forHEad = bot.emojis.find(emoji => emoji.name === "4HEad").toString();
    let botEmbed = new Discord.RichEmbed()
    .setDescription('Bot Information')
    .setColor('#00b22c')
    .setThumbnail(bot.user.displayAvatarURL)
    .addField(bot.user.username, `Just a bot ${forHEad}`)
    .addField('Created On', bot.user.createdAt);

    return message.channel.send(botEmbed);
}

module.exports.help = {
    name : 'botinfo'
}