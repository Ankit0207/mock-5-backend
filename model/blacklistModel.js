const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
    blacklistToken: {
        type: [String],
        required: true
    }
})

const blacklistModel = mongoose.model("blacklist", blacklistSchema);

module.exports = { blacklistModel };