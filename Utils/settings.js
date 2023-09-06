/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const { readFileSync } = require('fs');
const { load } = require('js-yaml');
const config = load(readFileSync('config.yml', 'utf8'));

const ticketdb = require('../Models/Ticket/Ticket-Open')

async function isTicket(interaction) {
    const userdata = ticketdb.findOne({ channelId: interaction.channel.id })

    if (!userdata) {
        return false
    } else {
        return userdata
    }
}

const crypto = require('crypto');
function createRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);
}

const createToken = (length) => {
    let values = [ createRandomString(16), createRandomString(4), createRandomString(4), createRandomString(4), createRandomString(12) ];
    let newValue = "";

    for (let i = 0; i < values.length; i++) {
        newValue += crypto.createHash('sha256').update(values[i]).digest('hex').substring(0, (length / values.length + 1));
    };

    newValue += crypto.createHash('sha256').update(Math.random().toString(36)).digest('hex').substring(0, (length / values.length + 1));
    return newValue;
}

module.exports = { config, isTicket, createToken };

/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/