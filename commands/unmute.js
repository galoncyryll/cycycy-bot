module.exports.run = async (bot, message, args, NaM) => {
    let unMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let muteRole = message.guild.roles.find(x => x.name === 'muted');
    if(!unMute) return message.channel.send(`User not found ${NaM}`);
    if(!message.member.roles.find(role => role.name === 'Mod cucks')) return message.reply(`You don't have permission for this command ${NaM}`);
    if(args[0] === "help") {
        message.reply("Usage: !=unmute <user>");
        return;
    }
    
    if(unMute.roles.find(x => x.name === 'muted')){
        await(unMute.removeRole(muteRole.id));
        message.channel.send(`<@${unMute.id}> has been unmuted!`);
    } else {
        message.channel.send(`<@${unMute.id}> is not muted!`);
    }
}

module.exports.help = {
    name : 'unmute'
}