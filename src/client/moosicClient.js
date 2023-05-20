const BaseClient = require("../structures/BaseClient.js");
const  Logger  = require("../structures/Logger.js");
const { ClientEventHandler , MusicEventHandler } = require("../structures/EventHandler.js");
const { Collection } = require("discord.js");
const { Loader } = require("../structures/Loaders.js");
const { ClusterClient } = require('discord-hybrid-sharding');
const {DataBase} = require("../Database/connect.js");

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
        this.cluster = new ClusterClient(this);
        new DataBase(this).connect();
        new ClientEventHandler(this).start();
        new MusicEventHandler(this).start();
        new Loader(this)
        .loadCommands()
        console.log(this)
    }
    
}