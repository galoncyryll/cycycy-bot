const Discord = require('discord.js');
const bot = require('../bot');
const db = require('../settings/databaseImport');

bot.on('guildMemberRemove', async member => {
    await member.guild.fetchAuditLogs().then(audit => {
       db.Logger.findOne({ serverID: member.guild.id }).then(logRes => {
            if(logRes.isEnabled && logRes.isEnabled === 'enable') {
                const auditKickedId = audit.entries.first().target.id;
                const memberKickedId = member.user.id
                if(auditKickedId === memberKickedId && audit.entries.first().action === 'MEMBER_KICK') {
                    let reason = audit.entries.first().reason;
                    let executor = audit.entries.first().executor.username
                    let logEmbed = new Discord.RichEmbed()
                        .setColor('#ff0000')
                        .setAuthor(`[${audit.entries.first().action}] | ${member.user.tag}`, member.user.avatarURL)
                        .addField('User', `<@${member.id}>`, true)
                        .addField('Reason', reason, true)
                        .addField('Executor', executor, true)
                        .setFooter(`ID: ${member.id}`)
                        .setTimestamp();

                    return bot.channels.get(logRes.logChannelID).send(logEmbed);
                } else {
                    let logEmbed = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setAuthor(`[LEFT] | ${member.user.tag}`, member.user.avatarURL)
                    .addField('User', `<@${member.id}>`, true)
                    .addField('Reason', 'Left the server.', true)
                    .setFooter(`ID: ${member.id}`)
                    .setTimestamp();

                    return bot.channels.get(logRes.logChannelID).send(logEmbed);
                }
            }
        }).catch(err => message.reply(`Error ${err}`));
    }).catch(err => message.reply(`Error ${err}`));
});