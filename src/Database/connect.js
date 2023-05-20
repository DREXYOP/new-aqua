const mongoose = require('mongoose');
const config = require("../config.json")
class DataBase {
    constructor(client) {
     this.client = client;
     this.config = config;
    }
    connect() {
        mongoose.connect(this.config.db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        mongoose.connection.once("open", async () => {
            await this.client.logger.log('DATABASE', 'Successfuly Connected To DataBase')

        })
        mongoose.connection.on("disconnected", async () => {
            await this.client.logger.log('DATABASE', 'DataBase got disconnected')

        })
        return;
    }
}



module.exports = {DataBase};