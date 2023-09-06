/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const ticketdb = require('../Models/Ticket/Ticket-Main');
const ticketLang = require('../Models/Language');
const ticketOpen = require('../Models/Ticket/Ticket-Open');
const ticketLimit = require('../Models/Ticket/Ticket-Limit');
const ticketTrans = require('../Models/Ticket/Ticket-Transcript');
const ticketTheme = require('../Models/Ticket/Ticket-Theme');
const ticketSettings = require('../Models/Ticket/Ticket-Settings');
const ticketColor = require('../Models/Ticket/Ticket-Theme');
const ticketCategory = require('../Models//Ticket/Ticket-Cat');
const ticketToggle = require('../Models/Ticket/Ticket-Toggle');

const blacklistdb = require('../Models/Blacklist');

module.exports = { ticketdb, ticketLang, ticketOpen, ticketLimit, ticketTrans, ticketTheme, ticketSettings, ticketColor, ticketCategory, ticketToggle, blacklistdb };

/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/