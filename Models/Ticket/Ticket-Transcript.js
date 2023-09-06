const { model, Schema } = require("mongoose");

const sch = new Schema({
  guildId: { type: String, required: true, default: null },
  channelId: { type: String, required: true, default: null },
});

module.exports = model("Nexus - Transcript - Channel", sch);
