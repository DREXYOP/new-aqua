const { ActivityType } = require('discord.js');


module.exports= {
  name: 'ready',
  once: true,
async execute(client) {
  
  client.logger.log("API",`${client.user.username} is ready with ${client.guilds.cache.size} server`)
 
 
    
   
    client.user.setActivity("-help", { type: ActivityType.Listening });
 
} 
};