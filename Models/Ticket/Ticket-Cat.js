const { model, Schema } = require("mongoose");

const sch = new Schema({
  guildId: { type: String, required: true, default: null },
  categoryId: { type: String, required: true, default: null },
});

module.exports = model("Nexus - Ticket - Category", sch);
