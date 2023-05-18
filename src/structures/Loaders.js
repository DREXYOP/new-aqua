export class Loader{
    constructor(client){
        this = client;
    }
    loadClientEvents() {
        readdirSync("./src/events/client").forEach(file => {
          const event = require(`../events/client/${file}`);
          let eventName = file.split(".")[0];
          this.logger.event(`Loading Events Client ${eventName}`);
          this.on(event.name, (...args) => event.run(this, ...args));
    
        });
      };
}