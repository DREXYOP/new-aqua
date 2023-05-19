import { readdirSync } from "node:fs";
import { join } from 'path';

export class ClientEventHandler {
    constructor(client) {
        this.client = client
        
        client.logger.debug('EVENTS', 'Loading client events')
    }

    start() {
        const eventFiles = readdirSync(join(__dirname, "..","events","client")).filter(file => file.endsWith('.js'));
     let nic = 0;
        for (const file of eventFiles) {
            
           const event = require(`../events/client/${file}`)
            if (event.once) {
                this.client.once(event.name, (...args) => event.execute( this.client, ...args));
            } else {
                this.client.on(event.name, (...args) => event.execute(this.client,...args));
            }
            nic++;
        }
        this.client.logger.debug('EVENTS', `Loaded ${nic} events`)
    }
    
}



export class MusicEventHandler {
    constructor(client) {
        this.client = client
        
        client.logger.debug('EVENTS', 'Loading events')
    }

    start() {
        const eventFiles = readdirSync(join(__dirname, "..","..","managers","events")).filter(file => file.endsWith('.js'));
     let nic = 0;
        for (const file of eventFiles) {
            
            const event = require(`../../managers/events/${file}`);
            if (event.once) {
                this.client.once(event.name, (...args) => event.execute( this.client, ...args));
            } else {
                this.client.on(event.name, (...args) => event.execute(this.client,...args));
            }
            nic++;
        }
        this.client.logger.debug('EVENTS', `Loaded ${nic} events`)
    }
    
}

