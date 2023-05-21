const { Poru } = require('poru');
const {Spotify} = require("poru-spotify");
let spotify = new Spotify({
    clientID:"PUT HERE",
    clientSecret:"PUT HERE"
  })


class Manager extends Poru{
    constructor(client){
        super(client, client.config.nodes, {
            library:"discord.js",
            defaultPlatform: "ytsearch",
            plugins: [spotify]
           })
    }
}

module.exports = {Manager};