const moosicClient  = require("./client/moosicClient.js");
// import config from "./config.json";
new moosicClient(require("./config.json").token);

