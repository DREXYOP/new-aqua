const Command = require("../../structures/Command.js");


module.exports = class Ping extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            description: {
                content: 'eval code through bot.',
                usage: 'eval',
                examples: ['eval'],
            },
            aliases: ['evl'],
            category: 'developer',
            cooldown: 3,
            player: {
                voice: false,
                dj: false,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: true,
                client: ['SendMessages', 'ViewChannels', 'EmbedLinks'],
                user: [],
                voteRequired: false,
            },
            slashCommand: true,
        });
    }
    async run(ctx, args) {
        
    }
};