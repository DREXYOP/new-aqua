const mongoose = require('mongoose')

const arSchema = new mongoose.Schema({
    _guildId: String,
    prefix: String
})

module.exports = mongoose.model('autoresume', arSchema);