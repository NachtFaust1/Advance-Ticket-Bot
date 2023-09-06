const { model, Schema } = require('mongoose')

const db = new Schema({
    guildId: { type: String, required: true, default: null },
    maxTickets:  { type: Number, required: false, default: 5 },
    maxTicketPanel: { type: Number, required: false, default: 5 },
})

module.exports = model('Nexus - Ticket - Limit', db)