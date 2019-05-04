const mongoose = require('mongoose');
const Mod = require('../../models/modDBtest');

module.exports.run = async (bot, message, args, NaM) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`You don't have permission for this command ${NaM}`);
    let namtest = args.join(' ')

    const mod = new Mod({
        _id: mongoose.Types.ObjectId(),
        serverID: message.guild.id,
        modName: namtest
    });

    Mod.find({ serverID: message.guild.id }).then(res => {
        console.log(res[0].serverID)
    })
    // mod.save().then(console.log).catch(console.log);
}

module.exports.help = {
    name : 'setmod'
}