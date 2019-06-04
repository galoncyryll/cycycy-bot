const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(args[0] === "help") {
        message.channel.send("```Usage: !=dictionary <word>```");
        return;
    }
    let word = args.join(' ');
    fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=4f364930-85c3-4dde-9714-71a1c8f3b97f`)
        .then(res => res.json())
        .then(definition => {
            
            definition.forEach(async defs => {
                
                let functionalLabel = defs.fl;
                let wordDef = defs.shortdef;
                let example = defs.def[0].sseq[0][0][1].dt[1][1][0].t
                // join args
                let joinedSyns= synonyms[0].join(', ');

                let wordEmbed = new Discord.RichEmbed()
                    .setColor("#004bc4")
                    .setTitle(word.charAt(0).toUpperCase() + word.slice(1))
                    .addField('Synonyms: ', synonyms ? joinedSyns : null )
                    .addField('Functional Label: ', functionalLabel)
                    .addField('Definition: ', wordDef)
                    .addField('Example: ', '```' + example +'```')
                await message.channel.send(wordEmbed);
            })
        }).catch(err => message.reply(err));
}

module.exports.help = {
    name : 'dictionary'
}