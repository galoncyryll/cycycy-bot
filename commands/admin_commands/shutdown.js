const process = require('process');

module.exports.run = async (bot, message) => {
    if(message.member.id === "487797385691398145") {
        const Pepega = bot.emojis.find(emoji => emoji.name === "Pepega").toString();
        return message.channel.send(`Shutting down... ${Pepega}`)
            .then(() => bot.destroy())
            .then(() => process.exit())
            .catch(err => console.log(err));
    } else {
        return message.reply("You don't have a permission for this command.");
    }
}

module.exports.help = {
    name : 'shutdown'
}