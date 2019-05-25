const mongoose = require('mongoose');
const BanPhrase = require('../../models/banPhraseDB');
const Mods = require('../../models/modDBtest');

module.exports.run = async (bot, message, args, NaM) => {
    if(args[0] === "help") {
        message.channel.send("```Usage: !=delbanphrase <word>```");
        return;
    }

    Mods.findOne({ serverID: message.guild.id }).then(res => {
        if(res) {
            let serverRole = message.guild.roles.get(res.modName)
            if(res.modName === serverRole.id && message.member.roles.has(serverRole.id)|| message.member.hasPermission('ADMINISTRATOR')) {
                let bp = args.join(' ');
                if(!bp) return message.reply(`Please add a word to be unbanned ${NaM}`);

                BanPhrase.deleteOne({ serverID: message.guild.id, banphrase: bp }).then(res => {
                    if(res.n >= 1){
                        message.reply(`The ban phrase "${bp}" has been deleted ${NaM}`);
                    } else {
                        message.reply(`Ban phrase doesn't exist ${NaM}`);
                    }
                });  
            } else {
                return message.reply(`You don't have permission for this command ${NaM}`);
            }
        } else {
            return message.reply(`You haven't set a mod in this server ${NaM}. To set a mod in this server do !=setmod help.`)
        }
    }).catch(err => message.reply(`Error ${err}`));
}

module.exports.help = {
    name : 'delbanphrase'
}