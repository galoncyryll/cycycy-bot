const process = require('process');

module.exports.run = async (bot, message) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You don't have a permission for this command.");
    const Pepega = bot.emojis.find(emoji => emoji.name === "Pepega").toString();
    return message.channel.send(`Shutting down... ${Pepega}`)
        .then(() => bot.destroy())
        .then(() => process.exit())
        .catch(err => console.log(err));
}

module.exports.help = {
    name : 'shutdown'
}