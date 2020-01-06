const Discord = require('discord.js');
const botconfig = require('./botconfig.json');
require('http').createServer().listen(3000);
require('dotenv').config();

const bot = new Discord.Client();

// Read commands directory
module.exports = bot;
require('./fsCommandReader');
require('./handlers/index');

// bot commands collection
bot.commands = new Discord.Collection();

// global command cooldown
bot.cooldown = new Set();

// cookie command cooldown
bot.cookieCD = new Map();

// Database
const db = require('./settings/databaseImport');

// message checker
const messageChecker = require('./handlers/messageChecker');

// connect to MongoDB Atlas
db.mongoose.connect(process.env.DB_PASS, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    bot.channels.get('531967060306165796').send(`Error connecting to DB: ${err}`);
  }
});

bot.on('ready', async () => {
  console.log(`${bot.user.username} is online! on ${bot.guilds.size} servers!`);
  bot.user.setActivity('forsan [$help]', { type: 'WATCHING' });
  bot.channels.get('531967060306165796').send(`${bot.user.username} is online on ${bot.guilds.size} servers!`); // my discord's bot test channel
});

bot.on('error', console.error); // error handler

bot.on('message', (message) => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  if (bot.cooldown.has(message.author.id)) return;

  const { prefix } = botconfig;
  const messageArray = message.content.split(' ');
  const cmd = messageArray[0];
  const args = messageArray.slice(1);

  // Emotes
  const NaM = bot.emojis.find(emoji => emoji.name === 'NaM');
  const OMGScoots = bot.emojis.find(emoji => emoji.name === 'OMGScoots');
  const weirdChamp = bot.emojis.find(emoji => emoji.name === 'WeirdChamp');

  // message checker handler
  messageChecker.handleMessage(bot, message, cmd, prefix, db, weirdChamp, NaM, OMGScoots);

  // call command handler
  const cmdFile = bot.commands.get(cmd.slice(prefix.length));
  if (cmdFile && cmd.startsWith(prefix)) cmdFile.run(bot, message, args, NaM, OMGScoots);

  // type
  if (message.isMentioned(bot.user)) {
    const msgArr = [`What ${weirdChamp} ❓`, `Stop tagging me ${weirdChamp}`, `What do you want ${weirdChamp}`, `Are you actually tagging me ${weirdChamp}`];
    message.channel.startTyping(100);
    console.log(message.content);
    setTimeout(() => {
      message.reply(msgArr[Math.floor(Math.random() * msgArr.length)]);
      return message.channel.stopTyping(true);
    }, 2000);
  }
});

bot.login(process.env.BOT_TOKEN);
