const Discord = require('discord.js');
const bot = require('../bot');
const db = require('../settings/databaseImport');

bot.on('messageDelete', async message => {
    const bp = await db.BanPhrase.find({ serverID: message.guild.id }).then(banPhrase => {
        return banPhrase.map(banPhraseItems => {
            if(message.content.toUpperCase().includes(banPhraseItems.banphrase.toUpperCase())) {
                return banPhraseItems.banphrase
            }
        });
    });
    const logger = banPhrase => {
        db.Logger.findOne({ serverID: message.guild.id }).then(logRes => {
            if(logRes.isEnabled && logRes.isEnabled === 'enable') {
                let logEmbed = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setAuthor(`[${auditLog.action}] | ${message.author.username}`, message.author.avatarURL)
                    .addField('User', `<@${message.author.id}>`, true)
                    .addField('Reason', bp ? `Matched ban phrase ${bp}` : `Deleted by <@${auditLog.executor.id}>`, true)
                    .addField('Message', message.content)
                    .setFooter(`MESSAGE ID: ${message.id}`)
                    .setTimestamp();

                return bot.channels.get(logRes.logChannelID).send(logEmbed);
            }
        }).catch(console.log);
    };

    if(bp) {
        message.guild.fetchAuditLogs(auditLog => {
            
        });
    }
});