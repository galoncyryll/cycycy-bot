const Discord = require('discord.js');
const botconfig = require('./botconfig.json');
const bot = new Discord.Client();
require('dotenv').config();

//Read commands directory
module.exports = bot;
require('./fsCommandReader');
require('./handlers/kick');
require('./handlers/onMessageDelete');

//bot commands collection
bot.commands = new Discord.Collection();

//global command cooldown
bot.cooldown = new Set();

//cookie command cooldown
bot.cookieCD = new Map();

//Database
const db = require('./settings/databaseImport');

//connect to MongoDB Atlas
db.mongoose.connect(process.env.DB_PASS, { useNewUrlParser: true });

bot.on('ready', async () => {
    console.log(`${bot.user.username} is online! on ${bot.guilds.size} servers!`);
    bot.user.setActivity('forsan [!=help]', { type: 'WATCHING' });
    bot.channels.get("531967060306165796").send(`${bot.user.username} is online on ${bot.guilds.size} servers!`); // my discord's bot test channel
})

bot.on('error', console.error); // error handler
    
bot.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (bot.cooldown.has(message.author.id)) return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    //Emotes
    const NaM = bot.emojis.find(emoji => emoji.name === "NaM");
    const AYAYA = bot.emojis.find(emoji => emoji.name === "AYAYA");
    const OMGScoots = bot.emojis.find(emoji => emoji.name === "OMGScoots");
    const weirdChamp = bot.emojis.find(emoji => emoji.name === "WeirdChamp");
    
    // call command handler
    let cmdFile = bot.commands.get(cmd.slice(prefix.length));
    if (cmdFile && cmd.startsWith(prefix)) cmdFile.run(bot,message,args,NaM);

    //type 
    if(message.isMentioned(bot.user)) {
        message.channel.startTyping(100);
        setTimeout(() => {
            message.reply(`what ${weirdChamp}❓`);
            return message.channel.stopTyping(true);
        }, 2000);
    }
    //AFK checker
    db.Afk.findOne({ userID: message.author.id }).then(result => {
         if(result) {
            let newTime = new Date();
            let ms = newTime - result.date;
            let totalSecs = (ms / 1000);
            let hours = Math.floor(totalSecs / 3600);
            totalSecs %= 3600;
            let minutes = Math.floor(totalSecs / 60);
            let seconds = totalSecs % 60;

            message.channel.send(`${message.author.username} is back (${hours}h, ${minutes}m and ${Math.trunc(seconds)}s ago): ${result.reason}`);
            //Checks if AFK type is gn or afk;
            if( result.afkType == 'afk') return db.Afk.deleteOne({ userID: result.userID }).then(console.log('Message Deleted')).catch(console.log);

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
            db.Afk.deleteOne({ userID: result.userID }).then(console.log('Message Deleted')).catch(console.log);
        }
    });
    
    //AFK Tagged checker
    db.Afk.find({}).then(afkRes => {
        afkRes.forEach(res => {
            if(message.isMentioned(res.userID)){
                if (cmd.startsWith(prefix)) return;
                const notifyUser =  message.guild.member(message.mentions.users.first());

                const notify = new db.Notify({
                    _id: db.mongoose.Types.ObjectId(),
                    username: notifyUser.user.username,
                    userID: res.userID,
                    senderName: message.author.username,
                    senderAvatar: message.member.user.avatarURL,
                    serverName: message.guild.name,
                    notifyMsg: message.content,
                    date: new Date()
                });
            
                db.Notify.find({ userID: res.userID }).then(notifyRes => {
                    if( notifyRes.length >= 5 ) { //message limiter
                        return message.reply(`${notifyUser} has already reached the limit of recieving messages ${NaM}`);
                    } else {
                        return notify.save().then(() => message.reply(`${notifyUser.user.username} is afk but i will send him that message when he types in this server ${OMGScoots} 👍`)).catch(console.log);
                    }
                });
            }
        });
    }).catch(console.log)

    //Notify checker
    db.Notify.find({ userID: message.author.id }).then(result => {
        if(result.length >= 1) {
            message.reply(`You have notifications ${NaM}`);

            result.forEach(resData => {
            let newTime = new Date();
            let ms = newTime - resData.date;
            let totalSecs = (ms / 1000);
            let hours = Math.floor(totalSecs / 3600);
            totalSecs %= 3600;
            let minutes = Math.floor(totalSecs / 60);
            let seconds = totalSecs % 60;
            
            let notifyEmbed = new Discord.RichEmbed()
                .setColor("#4e1df2")
                .setAuthor(`${resData.senderName} sent you a message from ${resData.serverName} server:`,  resData.senderAvatar)
                .addField(`Message (${hours}h, ${minutes}m and ${Math.trunc(seconds)}s ago): `, resData.notifyMsg)
            message.channel.send(notifyEmbed)
            .then(() => {
                db.Notify.deleteOne({ userID: resData.userID }).then(console.log('Message Deleted')).catch(console.log);
            })
            .catch(console.log);
            });
        }
    });

    //Custom command checker
    if(cmd.startsWith(prefix)){
        let cmdChk = cmd.slice(2);
        db.Cmd.findOne({ serverID: message.guild.id, commandName: cmdChk }).then(res => {
            if (res) {
                return message.channel.send(res.commandRes);
            }
        }).catch(console.log);
    };
    
    //Ban Phrase checker
    db.BanPhrase.find({ serverID: message.guild.id }).then(res => {
        res.forEach(bp => {
            if(message.content.toUpperCase().includes(bp.banphrase.toUpperCase())) {
                return message.delete().then(message.reply(`Your message matched the ban phrase in this server ${weirdChamp}`)).catch(console.log); 
            }
        })
    });

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

bot.login(process.env.BOT_TOKEN);