const { Client, GatewayIntentBits } = require('discord.js');
const gib = GatewayIntentBits;

 class BaseClient extends Client {
    constructor() {
        super({
            failIfNotExists: true,
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