const mongoose = require('mongoose');
const Mod = require('../../models/modDBtest');

module.exports.run = async (bot, message, args, NaM) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Only administrator have permission for this command ${NaM}`);
    if(args[0] === "help") {
        message.reply("```Usage: !=setmod <mod_role_name>```");
        return;
    }
    let role = args.join(' ');
    let roleFinder = message.guild.roles.find(r => r.name === role);

    if(!roleFinder) return message.reply(`Role doesn't exist ${NaM}`);

    const mod = new Mod({
        _id: mongoose.Types.ObjectId(),
        serverID: message.guild.id,
        modName: roleFinder.id
    });

    Mod.find({ serverID: message.guild.id }).then(res => {
        if(res.length>=1) {
            return message.reply(`Mod already exist in this server ${NaM}. You can edit mod name in this server by doing !=editmod ${NaM}.`);
        } else {
            return mod.save().then(message.channel.send(`Mod role added ${NaM}`)).catch(console.log);
        }
    })
    
}

module.exports.help = {
    name : 'setmod'
}