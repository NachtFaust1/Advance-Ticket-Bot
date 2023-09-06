const { model, Schema } = require('mongoose');

const ticketSchema = new Schema({
    guildId: { type: String, required: true, default: null },
    ticketPings: { type: Boolean, required: false, default: null },
    ticketTranscript: { type: Boolean, required: false, default: null },
    ticketAutoClose: { type: Boolean, required: false, default: null },
    ticketCategory: { type: Boolean, required: false, default: null },
});

module.exports = model('Nexus - Ticket - Toggle', ticketSchema);