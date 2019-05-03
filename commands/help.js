const Discord = require('discord.js');
const Cmd = require('../models/customCommandsDB');

module.exports.run = async (bot, message, args) => {
    let hUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    let helpEmbed = new Discord.RichEmbed()
    .setDescription("Help Menu")
    .setColor("#4286f4")
    .addField("Command Help", `do **!=<command_name> help** for command usage`)
    .addField("Member Commands", `**serverinfo** | info about server \n **botinfo** | info about bot \n **userinfo** | info about user \n **advice** | gives you advice OMGScoots \n **catfact** | random cat facts \n **translate** | automatically translates detected langauge \n **gn** | set status to AFK \n **notify** | notify a specific user \n **tuck** | tuck someone to bed \n **wiki** | wiki search OMGScoots \n **avatar** | shows the user's avatar`);

    await message.channel.send(helpEmbed);

    Cmd.find({ serverID: message.guild.id }).then(res => {
        let cmdArr = [];
        res.forEach(serverCmd => cmdArr.push(serverCmd.commandName));

        let joined = cmdArr.join(` \n`)

        let serverCmdEmbed = new Discord.RichEmbed()
        .setDescription("Server Commands")
        .setColor("#23ff74")
        .addField("Server Specific Commands", `**${joined}**`);

        return message.channel.send(serverCmdEmbed);
    }).catch(console.log);

    if(message.member.hasPermission("MANAGE_MESSAGES")){
        let modEmbed = new Discord.RichEmbed()
        .setDescription("Mod Help Menu")
        .setColor("#6dbefd")
        .addField("Mod Commands", `tempmute | temporarily mutes a user \n unmute | unmute a user \n addcmd | adds a command \n editcmd | edits a custom command \n delcmd | deletes a custom command \n addbanphrase | adds a banphrase \n delbanphrase | deletes a banphrase`);

        try {
            await message.author.send(modEmbed);
        } catch(e) {
            message.reply("Your DMs are locked. I can't send mod commands")
        }
    }
}

module.exports.help = {
    name: "help"
}