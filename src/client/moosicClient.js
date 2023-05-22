const BaseClient = require("../structures/BaseClient.js");
const  Logger  = require("../structures/Logger.js");
const { ClientEventHandler , MusicEventHandler } = require("../structures/EventHandler.js");
const { Collection , EmbedBuilder } = require("discord.js");
const { Loader } = require("../structures/Loaders.js");
const { ClusterClient } = require('discord-hybrid-sharding');
const { DataBase } = require("../Database/connect.js");
const Manager = require("../music/Shoukaku.js");


module.exports = class moosicClient extends BaseClient {
    constructor(token_main, config) {
        super();
        this.logger = new Logger();
        this.config = config;
        this.prefix = config.prefix;
        this.commands = new Collection();
        this.aliases = new Collection();
        this.cooldowns = new Collection();
        this.cluster = new ClusterClient(this);
        this.shoukaku = new Manager(this);
        new DataBase(this).connect();
        new ClientEventHandler(this).start();
        new MusicEventHandler(this).start();
        new Loader(this).loadCommands()
        this.login(token_main);
    }
    embed(data) {
        return new EmbedBuilder(data).setColor(`${this.config.colors.main}`);
      }
    
}