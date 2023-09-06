/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const { readFileSync } = require('fs');
const { load } = require('js-yaml');
const config = load(readFileSync('config.yml', 'utf8'));

module.exports = {
    name: 'messageCreate',

    async execute(message, client) {
        if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
            return message.reply({ content: `*Hey ${message.author}, use ${config.emojiConfig.Slash} **SlashCommands** to use me!*\nUse \`/help\` for more informations.\nhttps://i.imgur.com/vAwAWed.png` })
        }
    }
}

/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/