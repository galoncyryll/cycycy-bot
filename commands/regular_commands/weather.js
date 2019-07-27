const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (bot, message, args) => {
  const joinedArgs = args.join(' ');

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${joinedArgs}&appid=8d1a465793567f602b025c310a5d8c13`, {
    method: 'get',
    headers: { 'content-type': 'application/json' },
  })
    .then(res => res.json())
    .then((weather) => {
      console.log(weather);
      const { name } = weather;
      const weatherEmbed = new Discord.RichEmbed()
        .setAuthor(`Current Weather Forecast for ${name}`)
        .setThumbnail(`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
        .setTitle('Weather')
        .setDescription(weather.weather[0].description);


      return message.channel.send(weatherEmbed);
    });
};

module.exports.help = {
  name: 'weather',
};
