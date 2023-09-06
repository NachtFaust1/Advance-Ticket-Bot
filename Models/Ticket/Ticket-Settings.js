const { model, Schema } = require('mongoose');

const db = new Schema({
    guildId: { type: String, required: true, default: null },
    autoClose: { type: Boolean, default: null },
});

module.exports = model('Nexus - Ticket - Settings', db);