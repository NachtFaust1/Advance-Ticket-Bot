/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const { EmbedBuilder } = require('discord.js');
const ticketSettings = require('../../Models/Ticket/Ticket-Settings');
const ticketOpen = require('../../Models/Ticket/Ticket-Open');
const ticketLang = require('../../Models/Language');

const { readFileSync } = require('fs');
const { load } = require('js-yaml');
const config = load(readFileSync('config.yml', 'utf8'));

module.exports = {
    name: 'guildMemberRemove',

    async execute(member) {
        const data = await ticketSettings.findOne({ guildId: member.guild.id });
        if (!data) return;
        const data_ = await ticketOpen.findOne({ guildId: member.guild.id });
        if (!data_) return;

        const channel = member.guild.channels.cache.get(data_.channelId);
        const findLang = await ticketLang.findOne({ guildId: member.guild.id });
        const lang = require(`../../Locales/${findLang?.language || 'en'}.js`);

        if (data.autoClose == true) {
            if (data_.openerId == member.user.id) {
                const warningEmbed = new EmbedBuilder()
                .setColor(config.colorConfig.Error)
                .setAuthor({ name: `${lang.bot.ticketAutoClose.embedTitle}` })
                .setDescription(`${lang.bot.ticketAutoClose.embedDescription}`);
                channel.send({ embeds: [warningEmbed] });
                
                setTimeout(async () => {
                    await channel.delete();
                    await ticketOpen.deleteOne({ guildId: member.guild.id, openerId: member.user.id });
                }, 300000)
            }
        }
    }
}

/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/