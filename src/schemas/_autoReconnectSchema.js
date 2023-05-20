const { Schema, model} = require('mongoose');

let autoReconnect = new Schema({
    _guildId : String,
    _textId : String,
    _voiceId : String, 
});
module.exports = model('autoreconnect ', autoReconnect );