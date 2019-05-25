const Discord = require('discord.js');
const wiki = require('wikijs').default;

module.exports.run = async (bot, message, args) => {
    if(args[0] === "help") {
        message.channel.send("```Usage: !=wiki <wiki search>```");
        return;
    }
    let joinedArgs = args.join(' ');
        wiki().page(joinedArgs)
        .then(page => {
            let resultsEmbed = new Discord.RichEmbed()
            page.summary()
            .then(results => {
                page.mainImage()
                .then(img => resultsEmbed.setImage(img))
                .then(() => {
                    const toSend = results.substring(0, 2000);
                    resultsEmbed.setTitle(`Wiki about ${joinedArgs}`)
                    resultsEmbed.setColor('#db6c42')
                    resultsEmbed.setDescription(toSend)
                    message.channel.send(resultsEmbed);
                }).catch(err => message.reply(`Error ${err}`));
            }).catch(err => message.reply(`Error ${err}`));
        })
        .catch(err => message.reply(`Error ${err}`));
}

module.exports.help = {
    name : 'wiki'
}