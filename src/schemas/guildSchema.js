const mongoose = require('mongoose')
const { prefix } = require("../config.json")

const Options = {
    guildId: { type: String, required: true },
    prefix: { type: String, default: prefix },
    autoplay: { type: Boolean, default: false },
    twenty47: { type: Boolean, default: false },
    voiceChannelId: { type: String, default: false },
    textChannelId: { type: String, default: false },
    DjRoles: { type: Array, default: [] },
    announce: { type: Boolean, default: false },
};

module.exports = mongoose.model('Guild', Options);