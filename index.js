/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

require("./Handlers/Copyright");
require("cute-logs");
const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, GuildPresences } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = global.Client = new Client({ intents: [Guilds, GuildMembers, GuildMessages, GuildPresences], partials: [User, Message, GuildMember, ThreadMember] });

const { readFileSync } = require('fs');
const { load } = require('js-yaml');
const config = load(readFileSync('config.yml', 'utf8'));

client.config = load(readFileSync('config.yml', 'utf8'), 4);
global.Config = load(readFileSync('config.yml', 'utf8'), 4);
client.events = new Collection();
client.commands = new Collection();

const { connect, set } = require("mongoose");
set('strictQuery', true);
connect(config.botConfig.mongoURL).then(() =>
  console.info("Connected to Mongo Database", "[ MONGO ]")
);

const { loadEvents } = require("./Handlers/EventsLoader");
loadEvents(client);

client.login(config.botConfig.Token);

process.on("unhandledRejection", (reason, p) => {
  console.log(" [ ANTI-CRASH ] :: Unhandled Rejection/Catch");
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(" [ ANTI-CRASH ] :: Uncaught Exception/Catch");
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(" [ ANTI-CRASH ] :: Uncaught Exception/Catch (MONITOR)");
  console.log(err, origin);
});

/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/