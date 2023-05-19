import { BaseClient } from "../structures/BaseClient.js";
import { Logger } from "../structures/Logger.js";
// import { Loader } from "src/structures/Loaders.js";
import { Collection } from "discord.js";

export class moosicClient extends BaseClient {
    constructor(token_main, config) {
        super();
        this.login(token_main);
        this.logger = new Logger();
        this.config = config;
        this.prefix = "-";
        this.commands = new Collection()
        
    }
    
}