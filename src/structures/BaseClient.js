const { Client, GatewayIntentBits } = require('discord.js');
const gib = GatewayIntentBits;
const { getInfo } = require('discord-hybrid-sharding');
 class BaseClient extends Client {
    constructor() {
        super({
            failIfNotExists: true,
            shards: getInfo().SHARD_LIST, 
            shardCount: getInfo().TOTAL_SHARDS,
            allowedMentions: {
                parse: ['roles', 'users'],
                repliedUser: false,
            },
            intents: [
                gib.Guilds,
                gib.GuildVoiceStates,
                gib.GuildMessages,
                gib.GuildMembers,
                gib.GuildMessageTyping,
                gib.MessageContent
            ]
        });
    }
    async login(token) {
        if (!token) throw new RangeError('NO TOKEN WAS PROVIDED.');
        await super.login(token)
            .then(x => {
                return x;
            })
            .catch(err => console.log(err));
    }

}
module.exports = BaseClient