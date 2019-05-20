const Discord = require('discord.js');
const botconfig = require('./botconfig.json');
const bot = new Discord.Client();
require('dotenv').config();

//Read commands directory
module.exports = bot;
require('./fsCommandReader');

//bot commands collection
bot.commands = new Discord.Collection();

//cookie command cooldown
bot.cooldown = new Map();

//Database
const mongoose = require('mongoose');
const Notify = require('./models/notifyDB');
const Afk = require('./models/afkDB');
const Cmd = require('./models/customCommandsDB');
const BanPhrase = require('./models/banPhraseDB');

//connect to MongoDB Atlas
mongoose.connect(process.env.DB_PASS, { useNewUrlParser: true });

bot.on('ready', async () => {
    console.log(`${bot.user.username} is online! on ${bot.guilds.size} servers!`);
    bot.user.setActivity('forsan [!=help]', { type: 'WATCHING' });
    bot.channels.get("531967060306165796").send(`${bot.user.username} is online on ${bot.guilds.size} servers!`); // my discord's bot test channel
})

bot.on('error', console.error); // error handler

bot.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    //Emotes
    const NaM = bot.emojis.find(emoji => emoji.name === "NaM");
    const PepegaPls = bot.emojis.find(emoji => emoji.name === "PepegaPls");
    const AYAYA = bot.emojis.find(emoji => emoji.name === "AYAYA");
    const OMGScoots = bot.emojis.find(emoji => emoji.name === "OMGScoots");
    
    // call command handler
    let cmdFile = bot.commands.get(cmd.slice(prefix.length));
    if (cmdFile && cmd.startsWith(prefix)) cmdFile.run(bot,message,args,NaM);

    //AFK checker
    Afk.findOne({ userID: message.author.id }).then(result => {
         if(result) {
            let newTime = new Date();
            let ms = newTime - result.date;
            let totalSecs = (ms / 1000);
            let hours = Math.floor(totalSecs / 3600);
            totalSecs %= 3600;
            let minutes = Math.floor(totalSecs / 60);
            let seconds = totalSecs % 60;

            message.channel.send(`<@${message.author.id}> is back: ${result.reason} (${hours}h, ${minutes}m and ${Math.trunc(seconds)}s ago)`);
            //Checks if AFK type is gn or afk;
            if( result.afkType == 'afk') return Afk.deleteOne({ userID: result.userID }).then(console.log).catch(console.log); 

            //Proceeds if AFK type is gn
            if(hours >= 9) {
                let afkEmbed = new Discord.RichEmbed()
                .setColor('#f20000')
                .addField(`${message.author.username} you have slept for more than 9hrs`, `"Too much sleep on a regular basis can increase the risk of diabetes, heart disease, stroke and death according to several studies done over the years. Too much is defined as greater than nine hours" ${OMGScoots}`)
                message.channel.send(afkEmbed)
            } else if (hours < 6) {
                let afkEmbed = new Discord.RichEmbed()
                .setColor('#f20000')
                .addField(`${message.author.username} you have slept for less than 6hrs`, `"People who sleep less than 6 hours a night may be at increased risk of cardiovascular disease compared with those who sleep between 7 and 8 hours, suggests a new study published in the Journal of the American College of Cardiology. Poor quality sleep increases the risk of atherosclerosis—plaque buildup in the arteries throughout the body—according to the study." ${OMGScoots}`)
                message.channel.send(afkEmbed)
            }
            Afk.deleteOne({ userID: result.userID }).then(console.log).catch(console.log);
        }
    });

    //AFK Tagged checker
    Afk.find({}).then(result => {
        result.forEach(res => {
            if(message.isMentioned(res.userID)){
                if (cmd === '!=tuck') return;
                const notifyUser =  message.guild.member(message.mentions.users.first());

                const notify = new Notify({
                    _id: mongoose.Types.ObjectId(),
                    username: notifyUser.user.username,
                    userID: res.userID,
                    senderName: message.author.username,
                    serverName: message.guild.name,
                    notifyMsg: message.content
                });
            
                Notify.find({ userID: res.userID }).then(results => {
                    if( results.length >= 5 ) { //message limiter
                        return message.reply(`${notifyUser} has already reached the limit of recieving messages ${NaM}`);
                    } else {
                        notify.save().then(result => message.reply(`<@${res.userID}> is afk but i will send him that message when he types in this server ${OMGScoots} 👍`)).catch(err => console.log(err));
                    }
                });
            }
        });
    }).catch(err => console.log(err));
    
    //Notify checker
    Notify.find({ userID: message.author.id }).then(result => {
        if(result.length >= 1) {
            result.forEach(resData => {
            let notifyEmbed = new Discord.RichEmbed()
                .setColor("#4e1df2")
                .addField(`**${resData.senderName}** sent you a message from **${resData.serverName}** server:`,  resData.notifyMsg);
            message.reply(notifyEmbed)
            .then(() => {
                Notify.deleteOne({ userID: resData.userID })
                .then(console.log)
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
            });
        }
    });

    //Ban Phrase checker
    BanPhrase.find({ serverID: message.guild.id }).then(res => {
        if(message.member.roles.find(role => role.name === 'TriHard')) return;
        res.forEach(bp => {
            if(message.content.toUpperCase().includes(bp.banphrase.toUpperCase())) {
                const weirdChamp = bot.emojis.find(emoji => emoji.name === "WeirdChamp");
                message.delete(1000);
                message.reply(`No lacism here ${weirdChamp}`);
            }
        })
    });

    //Custom command checker
    if(cmd.startsWith(prefix)){
        let cmdChk = cmd.slice(2);
        Cmd.findOne({ serverID: message.guild.id, commandName: cmdChk }).then(res => {
            if (res) {
                return message.channel.send(res.commandRes);
            }
        }).catch(console.log);
    };

    // test command
    if(cmd === `${prefix}test`) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`You don't have a permission for this command. ${NaM}`);
        return message.channel.send(`RUNNING ${PepegaPls}`);
    }

    //Stats command
    if(cmd === `${prefix}stats`) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`You don't have a permission for this command. ${NaM}`);
        return message.channel.send(`${bot.user.username} is online! on ${bot.guilds.size} servers!`);
    }

    //Avatar Command
    if(cmd === `${prefix}avatar`) {
        let aUser = message.guild.member(message.mentions.users.first() || message.author);
        if(args[0] === "help") {
            message.channel.send("```Usage: !=avatar <user/empty>```");
            return;
        }
        if(!aUser) return message.channel.send(`User not found ${NaM}`);

        let avatarEmbed = new Discord.RichEmbed()
            .setImage(aUser.user.displayAvatarURL);
        return message.channel.send(avatarEmbed);
    }

    // get rid of weebs NaM
    if(message.content.includes(AYAYA) || message.content.toUpperCase().includes("AYAYA")) {
        if(message.channel.id === '500399188627161109') return; //weeb dungeon
        const DansGame = bot.emojis.find(emoji => emoji.name === "DansGame");
        message.channel.send(`${DansGame.toString()} :point_right: :door:`);
        message.channel.send('WEEBS OUT');
        message.react(DansGame.id).then(() => {
            message.react("👉").then(() => {
                message.react("🚪").catch(console.log);
            }).catch(console.log);
        }).catch(console.log);
     }
});

bot.on('messageDelete', message => {
    console.log(message);
    let logEmbed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setAuthor(`**[DELETE]** | ${message.author.tag}`,message.author.avatarURL)
        .addField('User', `<@${message.author.id}>`, true)
        // .addField('Moderator', `<@${}>`, true)
    // return message.channel.send(`Message sent by <@${message.author.id}> was deleted in <#${message.channel.id}> : ${message.content}`);
    message.channel.send(logEmbed);
})


bot.login(process.env.BOT_TOKEN);