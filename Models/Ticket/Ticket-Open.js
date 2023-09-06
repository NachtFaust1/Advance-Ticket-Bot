const { model, Schema } = require('mongoose');

const db = new Schema({
    guildId: { type: String, required: true, default: null },
    channelId: { type: String, required: true, default: null },
    date: { type: String, required: true, default: null },
    openerId: { type: String, required: true, default: null },
    isTicketNew: { type: Boolean, required: true, default: false },
    isClaimed: { type: Boolean, required: true, default: false },
    isClosed: { type: Boolean, required: true, default: false },
    isTranscript: { type: Boolean, required: true, default: false },
    staffClaimed: { type: String, default: null },
    usersinTicket: { type: Array, required: true, default: [] },
})

module.exports = model('Nexus - Ticket - Open', db)