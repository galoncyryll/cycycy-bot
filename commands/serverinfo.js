const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let serverIcon = message.guild.iconURL;
    let serverEmbed = new Discord.RichEmbed()
        .setDescription(message.guild.name)
        .setColor('#00b22c')
        .setThumbnail(serverIcon)
        .addField('Created On', message.guild.createdAt)
        .addField('You joined', message.member.joinedAt)
        .addField('Total Members', message.guild.memberCount);
    return message.channel.send(serverEmbed);
}

module.exports.help = {
    name : 'serverinfo'
}