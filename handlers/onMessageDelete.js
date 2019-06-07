const Discord = require('discord.js');
const bot = require('../bot');
const db = require('../settings/databaseImport');

bot.on('messageDelete', async message => {
    console.log(message + 'message')
    await message.guild.fetchAuditLogs().then(audit => {
        console.log(audit + 'audit')
        const deletedMessage = audit.entries.first();
        db.Logger.findOne({ serverID: message.guild.id }).then(logRes => {
            if(logRes.isEnabled && logRes.isEnabled === 'enable') {
                let logEmbed = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setAuthor(`[${deletedMessage.action}] | ${deletedMessage.executor.username}`, deletedMessage.executor.avatarURL)
                    .addField('User', `<@${deletedMessage.executor.id}>`, true)
                    .addField('Reason', 'Matched Ban Phrase', true)
                    .addField('Message', deletedMessage.executor.lastMessage.content)
                    .setFooter(`MESSAGE ID: ${deletedMessage.executor.lastMessage.id}`)
                    .setTimestamp();

                return bot.channels.get(logRes.logChannelID).send(logEmbed);
            }
        }).catch(console.log);
    });
});