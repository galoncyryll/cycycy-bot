const mongoose = require('mongoose');
const Pedo = require('../../models/pedoModDB');

module.exports.run = async (bot, message, args, NaM) => {
    Pedo.findOne({ serverID: message.guild.id, userID: message.member.id }).then(async pedoRes => {
        if(message.member.id === '487797385691398145' || message.member.hasPermission('ADMINISTRATOR')) {
            console.log('ownder command');
        } else if(!pedoRes) {
            return message.reply(`You dont have permission for this command ${NaM}`);
        }
        if(args[0] === "help") {
            message.channel.send("```Usage: !=pedofy <user>```");
            return;
        }

        let pedo = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!pedo) return message.channel.send(`User not found ${NaM}`);

        let pedoRole = message.guild.roles.find(role => role.name === 'Pedo');
        if(!pedoRole) {
            pedoRole = message.guild.createRole({
                name: 'Pedo',
                color: '#ff11b0',
                permissions: ['SEND_MESSAGES']
            })
            .then(prole => pedo.addRole(prole.id))
            .then(message.channel.send(`${pedo.user.username} is now a Pedo`))
            .catch(err => message.reply(`Error ${err}`));
        } else {
            return pedo.addRole(pedoRole)
            .then(message.channel.send(`${pedo.user.username} is now a Pedo`))
            .catch(err => message.reply(`Error ${err}`));
        }
            
    }).catch(err => message.reply(`Error ${err}`));
}

module.exports.help = {
    name : 'pedofy'
}