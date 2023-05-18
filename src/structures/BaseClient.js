const { Client, GatewayIntentBits } = require('discord.js');
const gib = GatewayIntentBits;

export class BaseClient extends Client {
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
                gib.GuildMessages
            ]
        });
    }
    async login(token) {
        if (!token) throw new RangeError('You must include TOKEN to login either in config.json or env');
        await super.login(token)
            .then(x => {
                return x;
            })
            .catch(err => console.log(err));
    }

}
