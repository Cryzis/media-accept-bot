const Discord = require('discord.js');
const config = require('./config.json');
const { messageHandler: mediaHandler } = require('./mediarole.js');
const { messageHandler: famousHandler } = require('./famousrole.js');

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});

let activityIndex = 0;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(config.statuses[0]);
  setInterval(() => {
    if(activityIndex >= config.statuses.length) {
      activityIndex = 0;
    }
    const newActivity = config.statuses[activityIndex];
    client.user.setActivity(newActivity);
    activityIndex++;
  }, config.statusDelay);
});

client.on('messageCreate', message => {
  mediaHandler(message, client); 
  famousHandler(message, client); 
});

client.login(config.token);