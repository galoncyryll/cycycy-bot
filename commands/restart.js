module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You don't have a permission for this command.");
    const Pepega = bot.emojis.find(emoji => emoji.name === "Pepega").toString();
    return message.channel.send(`Restarting... ${Pepega}`)
        .then(message => bot.destroy())
        .then(() => bot.login(process.env.BOT_TOKEN))
        .catch(err => console.log(err));
}

module.exports.help = {
    name : 'restart'
}