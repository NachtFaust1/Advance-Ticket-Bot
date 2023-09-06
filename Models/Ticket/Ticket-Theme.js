const { model, Schema } = require('mongoose')

const db = new Schema({
  guildId: { type: String, required: true, default: null },
  theme: { type: String, required: true, default: null }
})

module.exports = model('Nexus - Ticket - Theme', db)