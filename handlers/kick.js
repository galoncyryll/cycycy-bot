const Discord = require('discord.js');
const mongoose = require('mongoose');
const bot = require('../bot');
const db = require('../settings/databaseImport');
const leaveQueueDB = require('../models/leaveQueueDB');

bot.on('guildMemberRemove', async (member) => {
  await member.guild.fetchAuditLogs().then((audit) => {
    db.Logger.findOne({ serverID: member.guild.id }).then((logRes) => {
      if (logRes.isEnabled && logRes.isEnabled === 'enable') {
        const auditKickedId = audit.entries.first().target.id;
        const memberKickedId = member.user.id;
        if (auditKickedId === memberKickedId && audit.entries.first().action === 'MEMBER_KICK') {
          const { reason } = audit.entries.first();
          const executor = audit.entries.first().executor.username;
          const logEmbed = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setAuthor(`[${audit.entries.first().action}] | ${member.user.tag}`, member.user.avatarURL)
            .addField('User', `<@${member.id}>`, true)
            .addField('Reason', reason, true)
            .addField('Executor', executor, true)
            .setFooter(`ID: ${member.id}`)
            .setTimestamp();

          return bot.channels.get(logRes.logChannelID).send(logEmbed);
        } if (auditKickedId === memberKickedId && audit.entries.first().action === 'MEMBER_BAN_ADD') {
          const { reason } = audit.entries.first();
          const executor = audit.entries.first().executor.username;
          const logEmbed = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setAuthor(`[${audit.entries.first().action}] | ${member.user.tag}`, member.user.avatarURL)
            .addField('User', `<@${member.id}>`, true)
            .addField('Reason', reason, true)
            .addField('Executor', executor, true)
            .setFooter(`ID: ${member.id}`)
            .setTimestamp();

          return bot.channels.get(logRes.logChannelID).send(logEmbed);
        } if (logRes.leaveQueueLimit >= 1) {
          leaveQueueDB.findOne({ serverID: member.guild.id }).then((leaveRes) => {
            if (leaveRes) {
              if (leaveRes.membersLeft.length >= logRes.leaveQueueLimit) {
                const bulkLogEmbed = new Discord.RichEmbed()
                  .setColor('#ff0000')
                  .setAuthor(`[MEMBERS_LEFT] | ${leaveRes.membersLeft.length} members`)
                  .addField('Users', leaveRes.membersLeft.map(members => `<@${members}>`).join(' | '))
                  .addField('Reason', 'Left the server')
                  .setTimestamp();

                return bot.channels.get(logRes.logChannelID).send(bulkLogEmbed).then(() => leaveQueueDB.deleteOne({ serverID: member.guild.id }).then(console.log('guild limit deleted')).catch(err => console.log(err)));
              }
              leaveRes.membersLeft.push(member.id);
              return leaveRes.save();
            }
            const memberLeave = new leaveQueueDB({
              _id: mongoose.Types.ObjectId(),
              serverID: member.guild.id,
              serverName: member.guild.name,
              membersLeft: [member.id],
            });

            return memberLeave.save().then(console.log).catch(err => `Error: ${err}`);
          }).catch(err => console.log(err));
        } else {
          const logEmbed = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setAuthor(`[LEFT] | ${member.user.tag}`, member.user.avatarURL)
            .addField('User', `<@${member.id}>`, true)
            .addField('Reason', 'left the server', true)
            .setFooter(`ID: ${member.id}`)
            .setTimestamp();

          return bot.channels.get(logRes.logChannelID).send(logEmbed);
        }
      }
    }).catch(console.log);
  }).catch(console.log);
});
