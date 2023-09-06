const { model, Schema } = require("mongoose");

const sch = new Schema({
  guildId: { type: String, required: true, default: null },
  ownerId: { type: String, required: true, default: null },
  channelId: { type: String, required: true, default: null },
  panelId: { type: String, required: true, default: null },
  openerId: { type: String, required: false, default: null },
  embedId: { type: String, required: false, default: null },
  supportId: { type: String, required: true, default: null },
  ticketTitle: { type: String, required: true },
  ticketDescription: { type: String, required: true },
  ticketColor: { type: String, required: false },
  ticketImage: { type: String, required: false, default: null },
  ticketBtn: { type: String, required: true },
  ticketEmoji: { type: String, required: true },
  ticketTheme: { type: String, required: true },
  btnColor: { type: String, required: false },
  DMTranscript: { type: Boolean, required: true, default: false }
});

module.exports = model("Nexus - Ticket - System", sch);
