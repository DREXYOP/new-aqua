import { BaseClient } from "src/structures/BaseClient";
import { Logger } from "src/structures/Logger";
import { Loader } from "src/structures/Loaders";



export class moosicClient extends BaseClient{
    constructor(token_main , config){
        this.login(token_main)
        this.logger = new Logger
        this.config = config
    }
    load = new Loader(this);
}