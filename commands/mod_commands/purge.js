const Discord = require('discord.js');
const mongoose = require('mongoose');
const Cmd = require('../../models/customCommandsDB');
const Mods = require('../../models/modDBtest');
const db = require('../../settings/databaseImport');

module.exports.run = async (bot, message, args, NaM) => {
    if(args[0] === "help") {
        message.channel.send("```Usage: !=purge <number_of_messages>```");
        return;
    }
    await message.delete();

    Mods.findOne({ serverID: message.guild.id }).then(res => {
        if(res) {
            let serverRole = message.guild.roles.get(res.modName)
            if(res.modName === serverRole.id && message.member.roles.has(serverRole.id)|| message.member.hasPermission('ADMINISTRATOR')) {
                if(!args[0]) return message.reply(`Please add number of messages ${NaM}`);
                if(isNaN(args[0])) return message.reply(`Please use number as arguments. ${NaM}`);

                return message.channel.bulkDelete(args[0]).then(messages => {
                    db.Logger.findOne({ serverID: message.guild.id }).then(logRes => {
                        if(logRes.isEnabled && logRes.isEnabled === 'enable') {
                            messages.map(messagesItem => {
                                let logEmbed = new Discord.RichEmbed()
                                    .setColor('#ff0000')
                                    .setAuthor(`[PURGED] | ${messagesItem.author.username}`, messagesItem.author.avatarURL)
                                    .addField('User', `<@${messagesItem.author.id}>`, true)
                                    .addField('Reason', `Purged by <@${message.author.id}>`, true)
                                    .addField('Message', messagesItem.content)
                                    .setFooter(`MESSAGE ID: ${messagesItem.id}`)
                                    .setTimestamp();

                                return bot.channels.get(logRes.logChannelID).send(logEmbed);
                            });
                        }
                    }).catch(console.log);
                })
                
            } else {
                return message.reply(`You don't have permission for this command ${NaM}`);
            }
        } else {
            return message.reply(`You haven't set a mod in this server ${NaM}. To set a mod in this server do !=setmod help.`)
        }
    }).catch(err => message.reply(`Error ${err}`));
}

module.exports.help = {
    name : 'purge'
}