const ms = require('ms');

module.exports.run = async (bot, message, args, NaM) => {
    let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`You don't have permission for this command ${NaM}`);
    if(args[0] === "help") {
        message.reply("Usage: !=tempmute <user> <1s/m/h/d>");
        return;
    }
    if(!toMute) return message.channel.send(`User not found ${NaM}`);
    if(toMute.id === "487797385691398145") {
        return message.reply(`Can't mute my master ${monkaS}`)
    } else if(toMute.hasPermission("ADMINISTRATOR")) {
        return message.reply(`Can't mute administrator ${NaM}`);
    } else if(message.member.id === "487797385691398145") {
        console.log('owner command'); //command for cycycy(owner)
    } else if(toMute.hasPermission("MANAGE_MESSAGES")) {
        return message.reply(`Can't mute a mod ${NaM}`);
    }

    let muteRole = message.guild.roles.find(x => x.name === 'muted');
    if(!muteRole) {
        try {
            muteRole = await message.guild.createRole({
                name: 'muted',
                color: 'red',
                permissions: []
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch(e) {
            console.log(e.stack);
        }
    }

    let muteTime = args[1];
    if(!muteTime || ms(muteTime) === undefined) return message.reply("You didn't specify a time!");

    await(toMute.addRole(muteRole.id));
    message.reply(`<@${toMute.id}> has been muted for ${muteTime}`);

    setTimeout(() => {
        if(toMute.roles.find(x => x.name === 'muted')) {
            toMute.removeRole(muteRole.id);
            message.channel.send(`<@${toMute.id}> has been unmuted!`);
        }
    },ms(muteTime));

}

module.exports.help = {
    name : 'tempmute'
}