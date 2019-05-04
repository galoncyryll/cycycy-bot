module.exports.run = async (bot, message, args, NaM) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`You don't have permission for this command ${NaM}`);
    let role = args.join(' ');
    let roleFinder = message.guild.roles.find(r => r.name === role);
    if(roleFinder) {
        let roleSize = message.guild.roles.get(roleFinder.id).members;
        if(roleSize) return message.channel.send(`${role} has ${roleSize.size} members in this server`);
    } else {
        return message.channel.send(`Role not found ${NaM}`);
    }
}

module.exports.help = {
    name : 'rc'
}