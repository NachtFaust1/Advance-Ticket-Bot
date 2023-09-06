/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const { ChatInputCommandInteraction, Client, SlashCommandBuilder, EmbedBuilder, ChannelType } = require("discord.js");
const { ticketLimit, ticketLang, ticketTrans, ticketTheme } = require('../../Utils/models');
const { config } = require('../../Utils/settings');

const langArray = [
    { iso: 'en', label: 'EN', fullName: 'English' },
    { iso: 'th', label: 'TH', fullName: 'Thai' },
    { iso: 'hi', label: 'HI', fullName: 'Hindi'}
];

module.exports = {
    admin: true,
    data: new SlashCommandBuilder()
    .setName('config')
    .setDescription('Configure the bot settings.')
    .addSubcommand(subcommand =>
        subcommand
        .setName('transcript_channel')
        .setDescription('Set the transcript channel.')
        .addChannelOption(options =>
            options
            .setName('channel')
            .setDescription('Select the transcript channel.')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('max_ticket_per_user')
        .setDescription('Set the maximum tickets a user can have.')
        .addStringOption(options =>
            options
            .setName('value')
            .setDescription(`Enter the new max ticket per user value.`)
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('max_server_tickets')
        .setDescription('Set the maximum tickets a server can have.')
        .addStringOption(options =>
            options
            .setName('value')
            .setDescription(`Enter the new max server tickets value.`)
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('ticket_lang')
        .setDescription('Set a new default bot language.')
        .addStringOption(options =>
            options
            .setName('language')
            .setDescription('Select the new bot language')
            .setRequired(true)
            .addChoices(
                { name: 'EN-US (English, US)', value: 'en' },
                { name: 'TH (Thai)', value: 'th' },
                { name: 'HI (Hindi)', value: 'hi'}
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

        switch(subCommand) {
            case "transcript_channel": {
                const channel = interaction.options.getChannel('channel');
                const data = await ticketTrans.findOne({ guildId: interaction.guild.id });
                if (!data?.channelId == channel.id) return interaction.reply({ content: `${config.emojiConfig.Wrong} ${lang.bot.setup.transcript.error}`, ephemeral: true });

                if (!data) {
                    await ticketTrans.create({
                        guildId: interaction.guild.id,
                        channelId: channel.id
                    })
                } else {
                    ticketTrans.updateOne({ guildId: interaction.guild.id }, { $set: { channelId: channel.id } }).catch((err) => { console.log(err) });
                };
                const transcriptEmbed_ = new EmbedBuilder()
                .setColor(config.colorConfig.Main)
                .setDescription(`${config.emojiConfig.Right} ${lang.bot.setup.transcript.changed.replace('{channelName}', channel)}`);
                await interaction.reply({ embeds: [transcriptEmbed_], ephemeral: true });
            }
            break;
            case "max_ticket_per_user": {
                const value = interaction.options.getString('value');
                const data = await ticketLimit.findOne({ guildId: interaction.guild.id });
                
                if (!data) {
                    await ticketLimit.create({
                        guildId: interaction.guild.id,
                        maxTickets: value
                    });
                } else {
                    ticketLimit.updateOne({ guildId: interaction.guild.id }, { $set: { maxTickets: value } }).catch((err) => { console.log(err) });
                }
                const maxTicketEmbed_ = new EmbedBuilder()
                .setColor(config.colorConfig.Main)
                .setDescription(`${config.emojiConfig.Right} *Max Tickets Per User has been changed to \`${value}\`*`);
                interaction.reply({ embeds: [maxTicketEmbed_], ephemeral: true });
            }
            break;
            case "max_server_tickets": {
                const value = interaction.options.getString('value');
                const data = await ticketLimit.findOne({ guildId: interaction.guild.id });
                
                if (!data) {
                    await ticketLimit.create({
                        guildId: interaction.guild.id,
                        maxTicketPanel: value
                    });
                } else {
                    ticketLimit.updateOne({ guildId: interaction.guild.id }, { $set: { maxTicketPanel: value } }).catch((err) => { console.log(err) });
                }
                const maxTicketEmbed_ = new EmbedBuilder()
                .setColor(config.colorConfig.Main)
                .setDescription(`${config.emojiConfig.Right} *Max Server Tickets has been changed to \`${value}\`*`);
                interaction.reply({ embeds: [maxTicketEmbed_], ephemeral: true });
            }
            break;
            case "ticket_lang": {
                const lang = interaction.options.getString('language');
                const defaultLang = { iso: 'en', label: 'EN', fullName: 'English' }

                const findLang = await ticketLang.findOne({ guildId: interaction.guild.id });
                const Lang = require(`../../Locales/${findLang?.language || "en"}.js`);
        
                let findChanged = langArray.find(a => a.iso === lang);
                let oldLanguage = langArray.find(a => a.iso === findLang?.language) || defaultLang;
        
                const data = await ticketTheme.findOne({ guildId: interaction.guild.id });
        
                const newLang = await ticketLang.findOne({ guildId: interaction.guild.id });
                let changeText = Lang.bot.language.lang_description;
        
                if (!newLang) {
                    await ticketLang.create({
                        guildId: interaction.guild.id,
                        language: lang,
                    });
                    const setLang = new EmbedBuilder()
                    .setColor(data?.theme || config.colorConfig.Main)
                    .setAuthor({ name: `${Lang.bot.language.lang_title}` })
                    .setDescription(changeText)
                    .addFields(
                        { name: `${Lang.bot.language.lang_from}`, value: `${oldLanguage.fullName} (${oldLanguage.label})`, inline: true },
                        { name: `${Lang.bot.language.lang_to}`, value: `${findChanged.fullName} (${findChanged.label})`, inline: true }
                    )
                    .setFooter({ text: `${Lang.bot.language.lang_footer}` })
                    return interaction.reply({ embeds: [setLang], ephemeral: true });
                } else if (newLang) {
                    ticketLang.updateOne({ guildId: interaction.guild.id }, { $set: { language: lang } }).catch((err) => { console.log(err) });
                    try {
                        const setLang = new EmbedBuilder()
                        .setColor(data?.theme || config.colorConfig.Main)
                        .setAuthor({ name: `${Lang.bot.language.lang_title}` })
                        .setDescription(changeText)
                        .addFields(
                            { name: `${Lang.bot.language.lang_from}`, value: `${oldLanguage.fullName} (${oldLanguage.label})`, inline: true },
                            { name: `${Lang.bot.language.lang_to}`, value: `${findChanged.fullName} (${findChanged.label})`, inline: true }
                        )
                        .setFooter({ text: `${Lang.bot.language.lang_footer}` });
                        return interaction.reply({ embeds: [setLang], ephemeral: true })
                    } catch (err) {
                        console.error(err);
                        return interaction.reply({ content: `${Lang.bot.language.lang_error}`, ephemeral: true });
                    }
                }
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