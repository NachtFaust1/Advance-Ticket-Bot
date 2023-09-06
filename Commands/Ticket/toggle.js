/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const { ChatInputCommandInteraction, Client, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { ticketToggle, ticketLang } = require('../../Utils/models');
const { config } = require('../../Utils/settings');

module.exports = {
    admin: true,
    data: new SlashCommandBuilder()
    .setName('toggle')
    .setDescription('Configure the bot settings.')
    .addSubcommand(subcommand =>
        subcommand
        .setName('view')
        .setDescription('View the current configurations.')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('ticket_pings')
        .setDescription('Toggle whether ticket pings the user or not.')
        .addStringOption(options =>
            options
            .setName('value')
            .setDescription('Enter the new value.')
            .setRequired(true)
            .addChoices(
                { name: 'True', value: 'true' },
                { name: 'False', value: 'false' }
            )
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('transcript')
        .setDescription('Toggle whether transcripts logs to the channel or not.')
        .addStringOption(options =>
            options
            .setName('value')
            .setDescription('Enter the new value.')
            .setRequired(true)
            .addChoices(
                { name: 'True', value: 'true' },
                { name: 'False', value: 'false' }
            )
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('dm_transcript')
        .setDescription('Toggle whether transcripts DMs to the user or not.')
        .addStringOption(options =>
            options
            .setName('value')
            .setDescription('Enter the new value.')
            .setRequired(true)
            .addChoices(
                { name: 'True', value: 'true' },
                { name: 'False', value: 'false' }
            )
        )
        .addStringOption(options =>
            options
            .setName('panel_id')
            .setDescription('Enter the ticket panel id.')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('auto_close')
        .setDescription('Toggle whether tickets auto close or not when the user leaves.')
        .addStringOption(options =>
            options
            .setName('value')
            .setDescription('Enter the new value.')
            .setRequired(true)
            .addChoices(
                { name: 'True', value: 'true' },
                { name: 'False', value: 'false' }
            )
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('ticket_category')
        .setDescription('Toggle whether tickets are created in a category or not.')
        .addStringOption(options =>
            options
            .setName('value')
            .setDescription('Enter the new value.')
            .setRequired(true)
            .addChoices(
                { name: 'True', value: 'true' },
                { name: 'False', value: 'false' }
            )
        )
    ),

    /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
    async execute(interaction, client) {
        const subCommand = interaction.options.getSubcommand();
        const findLang = await ticketLang.findOne({ guildId: interaction.guild.id });
        const lang = require(`../../Locales/${findLang?.language || 'en'}.js`);

        switch (subCommand) {
            case 'view': {
                const data = await ticketToggle.findOne({ guildId: interaction.guild.id });

                let ToggleEmoji;
                let ToggleEmoji1;
                let ToggleEmoji2;
                let ToggleEmoji3;

                const viewEmbed = new EmbedBuilder()
                .setColor(config.colorConfig.Main)
                .setAuthor({ name: `Ticket Toggle Settings` })
                .setDescription(`*Here you'll see the current toggle settings.*`)
                .addFields(
                    { name: 'Ticket Pings:', value: `🔃 Loading...`, inline: true },
                    { name: 'Transcript Logs:', value: `🔃 Loading...`, inline: true },
                    { name: 'AutoClose on Leave:', value: `🔃 Loading...`, inline: true },
                    { name: 'Ticket Category:', value: `🔃 Loading...`, inline: true },
                )
                .setFooter({ text: `Powered by TicketPrime.gq`, iconURL: client.user.displayAvatarURL() });

                interaction.reply({ embeds: [viewEmbed] }).then(reply => {
                    setTimeout(() => {
                        ToggleEmoji = data?.ticketPings === true ? '<:prime_on:1084698872359686154> \`On\`' : '<:prime_off:1084698867636904018> \`Off\`';
                        ToggleEmoji1 = data?.ticketTranscript === true ? '<:prime_on:1084698872359686154> \`On\`' : '<:prime_off:1084698867636904018> \`Off\`';
                        ToggleEmoji2 = data?.ticketAutoClose === true ? '<:prime_on:1084698872359686154> \`On\`' : '<:prime_off:1084698867636904018> \`Off\`';
                        ToggleEmoji3 = data?.ticketCategory === true ? '<:prime_on:1084698872359686154> \`On\`' : '<:prime_off:1084698867636904018> \`Off\`';

                        const updatedEmbed = new EmbedBuilder()
                        .setColor(config.colorConfig.Main)
                        .setAuthor({ name: `Ticket Toggle Settings` })
                        .setDescription(`*Here you'll see the current toggle settings.*`)
                        .addFields(
                            { name: 'Ticket Pings:', value: `${ToggleEmoji}`, inline: true },
                            { name: 'Transcript Logs:', value: `${ToggleEmoji1}`, inline: true },
                            { name: 'AutoClose on Leave:', value: `${ToggleEmoji2}`, inline: true },
                            { name: 'Ticket Category:', value: `${ToggleEmoji3}`, inline: true },
                        )
                        .setFooter({ text: `Powered by TicketPrime.gq`, iconURL: client.user.displayAvatarURL() });

                        reply.edit({ embeds: [updatedEmbed] });
                    }, 2000);
                });

            }
            break;
            case 'ticket_pings': {
                const value = interaction.options.getString('value');

                const data = await ticketToggle.findOne({ guildId: interaction.guild.id });
                if (!data) {
                    ticketToggle.create({
                        guildId: interaction.guild.id,
                        ticketPings: value
                    });
                } else {
                    ticketToggle.updateOne({ guildId: interaction.guild.id }, { ticketPings: value }).catch((err) => console.error(err));
                }

                const ticketPingEmbed = new EmbedBuilder()
                .setColor(config.colorConfig.Main)
                .setDescription(`${config.emojiConfig.Right} *Ticket Pings has been set to \`${value}\`*.`)
                interaction.reply({ embeds: [ticketPingEmbed], ephemeral: true });
            }
            break;
            case 'transcript': {
                const value = interaction.options.getString('value');

                const data = await ticketToggle.findOne({ guildId: interaction.guild.id });
                if (!data) {
                    ticketToggle.create({
                        guildId: interaction.guild.id,
                        ticketTranscript: value
                    });
                } else {
                    ticketToggle.updateOne({ guildId: interaction.guild.id }, { ticketTranscript: value }).catch((err) => console.error(err));
                }

                const ticketPingEmbed = new EmbedBuilder()
                .setColor(config.colorConfig.Main)
                .setDescription(`${config.emojiConfig.Right} *Ticket Transcript has been set to \`${value}\`*.`)
                interaction.reply({ embeds: [ticketPingEmbed], ephemeral: true });
            }
            break;
            case 'dm_transcript': {
                const option = interaction.options.getString('value');
                const panelId = interaction.options.getString('panel_id');

                const data = await ticketdb.findOne({ guildId: interaction.guild.id });
                const errEmbed = new EmbedBuilder()
                .setColor(config.colorConfig.Error)
                .setDescription(`${config.emojiConfig.Wrong} ${lang.bot.setup.dmTranscript.error}`)
                if (data.panelId !== panelId) return interaction.reply({ embeds: [errEmbed], ephemeral: true });

                if (!data) {
                    await ticketdb.create({
                        guildId: interaction.guild.id,
                        DMTranscript: option
                    })
                } else {
                    await ticketdb.updateOne({ guildId: interaction.guild.id, panelId: panelId }, { $set: { DMTranscript: option } }).catch((err) => { console.log(err) });
                }
                
                const dmTranscript = new EmbedBuilder()
                .setColor(config.colorConfig.Main)
                .setDescription(`${config.emojiConfig.Right} ${lang.bot.setup.dmTranscript.changed.replace('{toggle}', option)}`);
                await interaction.reply({ embeds: [dmTranscript], ephemeral: true });            
            }
            break;
            case 'auto_close': {
                const value = interaction.options.getString('value');

                const data = await ticketToggle.findOne({ guildId: interaction.guild.id });
                if (!data) {
                    ticketToggle.create({
                        guildId: interaction.guild.id,
                        ticketTranscript: value
                    });
                } else {
                    ticketToggle.updateOne({ guildId: interaction.guild.id }, { ticketAutoClose: value }).catch((err) => console.error(err));
                }

                const ticketPingEmbed = new EmbedBuilder()
                .setColor(config.colorConfig.Main)
                .setDescription(`${config.emojiConfig.Right} *Ticket Auto Close has been set to \`${value}\`*.`)
                interaction.reply({ embeds: [ticketPingEmbed], ephemeral: true });
            }
            break;
            case 'ticket_category': {
                const value = interaction.options.getString('value');

                const data = await ticketToggle.findOne({ guildId: interaction.guild.id });
                if (!data) {
                    ticketToggle.create({
                        guildId: interaction.guild.id,
                        ticketCategory: value
                    });
                } else {
                    ticketToggle.updateOne({ guildId: interaction.guild.id }, { ticketCategory: value }).catch((err) => console.error(err));
                }

                const ticketPingEmbed = new EmbedBuilder()
                .setColor(config.colorConfig.Main)
                .setDescription(`${config.emojiConfig.Right} *Ticket Category has been set to \`${value}\`*.`)
                interaction.reply({ embeds: [ticketPingEmbed], ephemeral: true });
            }
            break;

        }
    }
}

/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/