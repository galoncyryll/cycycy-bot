const bot = require('../bot');

bot.on('messageUpdate', (oldM, newM) => {
  console.log(oldM.content, oldM.author.username);
  console.log(newM.content, newM.author.username);
});
