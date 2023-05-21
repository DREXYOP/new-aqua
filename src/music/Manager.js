const { Poru } = require('poru');
const {Spotify} = require("poru-spotify");
let spotify = new Spotify({
    clientID:"PUT HERE",
    clientSecret:"PUT HERE"
  })


class Manager extends Poru{
    constructor(client){
        super(client,[{
            "name": "NODE_1",
            "host":"node1.kartadharta.xyz", 
            "port": 443,
            "password": "kdlavalink",
            "secure": true
          }], {
            library:"discord.js",
            defaultPlatform: "ytsearch",
            plugins: [spotify]
           })
    }
}

module.exports = {Manager};