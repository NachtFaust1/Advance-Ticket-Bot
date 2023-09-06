/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const { ChatInputCommandInteraction, Client, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { ticketLang, ticketOpen } = require('../../Utils/models');
const { config, isTicket } = require('../../Utils/settings');

module.exports = {
    admin: true,
    data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('Unlocks a locked ticket.'),

    /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
    async execute(interaction, client) {
        const findLang = await ticketLang.findOne({ guildId: interaction.guild.id });
        const lang = require(`../../Locales/${findLang?.language || 'en'}.js`);
        const data_ = await ticketOpen.findOne({ guildId: interaction.guild.id });
        const data = await isTicket(interaction);

        const errEmbed = new EmbedBuilder()
        .setColor(config.colorConfig.Error)
        .setDescription(`${config.emojiConfig.Wrong} ${lang.bot.ticket.addUser.channel_error}`)
        if (!data) return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await interaction.channel.permissionOverwrites.edit(data_.openerId, {
            SendMessages: true,
        });

        client.channels.fetch(data_.channelId).then((channel) => {
            const warningEmbed = new EmbedBuilder()
            .setColor(config.colorConfig.Main)
            .setDescription(`${config.emojiConfig.Right} ${lang.bot.ticketUnlock.unlockDescription.replace('{userName}', interaction.user)}`);
            channel.send({ embeds: [warningEmbed] });
        });

        const successEmbed = new EmbedBuilder()
        .setColor(config.colorConfig.Main)
        .setDescription(`${config.emojiConfig.Right} ${lang.bot.ticketUnlock.unlockSuccessDesc}`);
        return interaction.reply({ embeds: [successEmbed], ephemeral: true });
    }
}

/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/