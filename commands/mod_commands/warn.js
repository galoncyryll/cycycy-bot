const Discord = require('discord.js');
const fs = require('fs');
const ms = require('ms');
let warns = JSON.parse(fs.readFileSync('./warnings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply("You don't have a permission for this command.");
    let warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!warnUser) return message.channel.send('User not found NaM');
    if(warnUser.hasPermission('BAN_MEMBERS')) return message.reply("You can't warn a M OMEGALUL D");
    let reason = args.join(' ').slice(22);

    if(!warns[warnUser.id]) {
        warns[warnUser.id] = {
            warnings : 0
        }  
    }
    if(!reason) {
        message.reply("Please add a reason :)")
    } else {
        warns[warnUser.id].warnings++;
    }

    fs.writeFile('./warnings.json', JSON.stringify(warns), (err) => {
        if (err) {
            console.log(err);
        }
    });

    let warnEmbed = new Discord.RichEmbed()
        .setTitle("Warns")
        .setAuthor(message.author.username)
        .setColor("#FF0000")
        .addField("Warned User", `<@${warnUser.id}>`)
        .addField("Warned In", message.channel)
        .addField("Number of Warnings", warns[warnUser.id].warnings)
        .addField("Reason", reason);
    message.channel.send(warnEmbed);

    if(warns[warnUser.id].warnings == 5) {
        let muteRole = message.guild.roles.find('name', 'muted');
        if(!muteRole) return message.reply('No mute role found');

        let muteTime = "1m";
        await(warnUser.addRole(muteRole.id));
        message.channel.send(`${warnUser} has been temporarily muted`);

        setTimeout(() => {
            warnUser.removeRole(muteRole.id);
            message.channel.send(`${warnUser} has been unmuted.`);  
        }, ms(muteTime));
    }
}

module.exports.help = {
    name : 'warn'
}