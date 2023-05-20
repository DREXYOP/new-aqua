const mongoose = require('mongoose')
const {prefix} = require("../config.json")

const Options = {
    memberId: { type: String } 
};

module.exports = mongoose.model('Member', Options);