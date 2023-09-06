const { model, Schema } = require('mongoose')

const db = new Schema({
    guildId: { type: String, required: true, default: null },
    premiumStatus: { type: Boolean, required: true, default: fals },
})

module.exports = model('Nexus - Ticket - Premium', db)