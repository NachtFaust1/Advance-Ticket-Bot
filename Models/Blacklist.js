const { model, Schema } = require("mongoose");

const db = new Schema({
  guildId: { type: String, required: true, default: null },
  type: { type: String, required: true, default: null },
  blacklisted: { 
    id: { type: String, required: true, default: null },
    added: { type: String, required: true, default: null }
  },
  reason: { type: String, required: true, default: null },
});

module.exports = model("Nexus - Blacklist - System", db);
