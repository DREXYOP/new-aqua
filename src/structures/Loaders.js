const { Routes, REST, ApplicationCommandType } = require('discord.js');
const { readdirSync } = require('node:fs');

class Loader {
    constructor(client) {
        this.client = client;
    }
    loadCommands() {
        const data = [];
        let i = 0;
        const commandsFolder = readdirSync("./src/commands/");
        commandsFolder.forEach((category) => {
            const categories = readdirSync(`./src/commands/${category}/`).filter(
                (file) => file.endsWith('.js'),
            );
            categories.forEach((command) => {
                const f = require(`../commands/${category}/${command}`);
                const cmd = new f(this.client, f);
                cmd.category = category;
                cmd.file = f;
                cmd.fileName = f.name;
                this.client.commands.set(cmd.name, cmd);
                if (cmd.aliases && Array.isArray(cmd.aliases)) {
                    for (const alias of cmd.aliases) {
                        console.log(alias);
                        this.client.aliases.set(alias, cmd);
                    }
                }
                if (cmd.slashCommand) {
                    data.push({
                        name: cmd.name,
                        description: cmd.description.content,
                        options: cmd.options,
                        type: ApplicationCommandType.ChatInput,
                    });
                    if (cmd.permissions.user.length > 0)
                        data.default_member_permissions = cmd.permissions.user
                            ? PermissionsBitField.resolve(cmd.permissions.user).toString()
                            : 0;
                    ++i;
                }
                this.client.logger.log("Comamnds", `Successfully loaded ${i} slash commands .`);
            });
        });

        const rest = new REST({ version: '10' }).setToken(
            this.client.user ? this.client.token : require('../config.json').token,
        );

        rest
            .put(
                Routes.applicationCommands(
                    this.client.user ? this.client.user.id : "985530826429190175",
                ),
                { body: data },
            )
            .then(() =>
                this.client.logger.log("Commands", 'Successfully reloaded application slash commands.'),
            )
            .catch((e) => this.client.logger.error(e.name, e.message));
    }
    loadPlayer() {
        this.manager = new Kazagumo({
            plugins: [
                new Spotify({
                    clientId: this.client.config.SpotifyID,
                    clientSecret: this.client.config.SpotifySecret,
                    playlistPageLimit: 3, // optional ( 100 tracks per page )
                    albumPageLimit: 4, // optional ( 50 tracks per page )
                    searchLimit: 10, // optional ( track search limit. Max 50 )
                    searchMarket: 'IN', // optional || default: US ( Enter the country you live in. [ Can only be of 2 letters. For eg: US, IN, EN ] )//
                }),
                new Plugins.PlayerMoved(this),
            ],
            defaultSearchEngine: "youtube",
            send: (guildId, payload) => {
                const guild = this.guilds.cache.get(guildId);
                if (guild) guild.shard.send(payload);
            }
        }, new Connectors.DiscordJS(this.client), this.config.nodes, shoukakuOptions);
        return this.Kazagumo;


    }

}
module.exports = { Loader }