const { model, Schema } = require('mongoose');

const db = new Schema({
    guildId: { type: String, required: true, default: null },
    language: { type: String, required: true, default: "en" }
})

module.exports = model('Nexus - Language - System', db);