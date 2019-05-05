module.exports.run = async (bot, message, args) => {
    if(message.member.id === "487797385691398145") {
        const Pepega = bot.emojis.find(emoji => emoji.name === "Pepega").toString();
        return message.channel.send(`Restarting... ${Pepega}`)
            .then(message => bot.destroy())
            .then(() => bot.login(process.env.BOT_TOKEN))
            .catch(err => console.log(err));
    } else {
        return message.reply("You don't have a permission for this command.");
    }
}

module.exports.help = {
    name : 'restart'
}