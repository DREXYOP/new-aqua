const BaseClient = require("../structures/BaseClient.js");
const  Logger  = require("../structures/Logger.js");
const { ClientEventHandler , MusicEventHandler } = require("../structures/EventHandler.js");
const { Collection } = require("discord.js");

module.exports = class moosicClient extends BaseClient {
    constructor(token_main, config) {
        super();
        this.login(token_main);
        this.logger = new Logger();
        this.config = config;
        this.prefix = "-";
        this.commands = new Collection();
        this.aliases = new Collection();
        this.cooldowns = new Collection();
        new ClientEventHandler(this).start();
        new MusicEventHandler(this).start();
    }
    
}