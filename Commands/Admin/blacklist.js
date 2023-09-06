/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const { ChatInputCommandInteraction, Client, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { blacklistdb, ticketLang, ticketTheme } = require('../../Utils/models');
const { config } = require('../../Utils/settings');

const dayjs = require('dayjs');

module.exports = {
    admin: true,
    data: new SlashCommandBuilder()
    .setName('blacklist')
    .setDescription('Blacklist System.')
    .addSubcommand(subcommand =>
        subcommand
        .setName('add')
        .setDescription('Add a guild or user to the blacklist system.')
        .addStringOption(options =>
            options
            .setName('type')
            .setDescription('Blacklist either a guild or a user.')
            .setRequired(true)
            .addChoices(
                { name: 'Guild', value: 'guild' },
                { name: 'User', value: 'user' }
            )
        )
        .addStringOption(options =>
            options
            .setName('id')
            .setDescription('Input the ID of the blacklisted user or guild.')
            .setRequired(true)
        )
        .addStringOption(options =>
            options
            .setName('reason')
            .setDescription('Provide a reason.')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('remove')
        .setDescription('Remove a guild or user from the blacklist system.')
        .addStringOption(options =>
            options
            .setName('type')
            .setDescription('Blacklist either a guild or a user.')
            .setRequired(true)
            .addChoices(
                { name: 'Guild', value: 'guild' },
                { name: 'User', value: 'user' }
            )
        )
        .addStringOption(options =>
            options
            .setName('id')
            .setDescription('Input the ID of the blacklisted user or guild.')
            .setRequired(true)
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
        const lang = require(`../../Locales/${findLang?.language || "en"}.js`);
        const data_ = await ticketTheme.findOne({ guildId: interaction.guild.id });
        const time = dayjs(Date.now()).unix();

        switch (subCommand) {
            case "add": {
                const type = interaction.options.getString('type');
                const ID = interaction.options.getString('id');
                const reason = interaction.options.getString('reason');
                if (isNaN(ID)) return interaction.reply({ content: `${config.emojiConfig.Wrong} ${lang.bot.blacklist.error.errOne}`, ephemeral: true });

                if (type == 'guild') {
                    const guild = await client.guilds.fetch(ID);
                    if (guild == undefined || guild == null) return interaction.reply({ content: `${config.emojiConfig.Wrong} ${lang.bot.blacklist.error.errTwo}`, ephemeral: true });

                    const data = await blacklistdb.findOne({ guildId: interaction.guild.id });
                    if (!data) {
                        await blacklistdb.create({
                            guildId: interaction.guild.id,
                            type: 'guild',
                            blacklisted: {
                                id: guild.id,
                                added: time
                            },
                            reason
                        });
                        const guildBlkEmbed = new EmbedBuilder()
                        .setColor(data_.theme || config.colorConfig.Main)
                        .setDescription(`${config.emojiConfig.Right} ${lang.bot.blacklist.guild.created.replace('{guildName}', guild.name)}`);
                        return interaction.reply({ embeds: [guildBlkEmbed], ephemeral: true });
                    } else {
                        await blacklistdb.create({
                            guildId: interaction.guild.id,
                            type: 'guild',
                            blacklisted: {
                                id: guild.id,
                                added: time
                            },
                            reason
                        });
                        const guildBlkEmbed = new EmbedBuilder()
                        .setColor(data_.theme || config.colorConfig.Main)
                        .setDescription(`${config.emojiConfig.Right} ${lang.bot.blacklist.guild.created.replace('{guildName}', guild.name)}`);
                        return interaction.reply({ embeds: [guildBlkEmbed], ephemeral: true });
                    }
                } else if (type == 'user') {
                    const users = await client.users.fetch(ID);
                    const data = await blacklistdb.findOne({ guildId: interaction.guild.id });

                    if (!data) {
                        await blacklistdb.create({
                            guildId: interaction.guild.id,
                            type: 'user',
                            blacklisted: {
                                id: users.id,
                                added: time
                            },
                            reason
                        });
                        const userBlkEmbed = new EmbedBuilder()
                        .setColor(data_.theme || config.colorConfig.Main)
                        .setDescription(`${config.emojiConfig.Right} ${lang.bot.blacklist.user.created.replace('{userName}', users)}`);
                        return interaction.reply({ embeds: [userBlkEmbed], ephemeral: true });
                    } else {
                        await blacklistdb.create({
                            guildId: interaction.guild.id,
                            type: 'user',
                            blacklisted: {
                                id: users.id,
                                added: time
                            },
                            reason
                        });
                        const userBlkEmbed = new EmbedBuilder()
                        .setColor(data_.theme || config.colorConfig.Main)
                        .setDescription(`${config.emojiConfig.Right} ${lang.bot.blacklist.user.created.replace('{userName}', users)}`);
                        return interaction.reply({ embeds: [userBlkEmbed], ephemeral: true });
                    }
                }
            }
            break;
            case "remove": {
                const type = interaction.options.getString('type');
                const ID = interaction.options.getString('id');

                if (type == 'guild') {
                    const guild = await client.guilds.fetch(ID);
                    const data_ = await blacklistdb.findOne({ guildId: interaction.guild.id, type: 'guild' });

                    if (!data_.blacklisted || data_.blacklisted.id !== guild.id) {
                        return interaction.reply({ content: `${config.emojiConfig.Wrong} ${lang.bot.blacklist.error.errThree}`, ephemeral: true });
                    } else {
                        await blacklistdb.deleteOne({ 'blacklisted.id': guild.id });
                        const removeGuildEmbed = new EmbedBuilder()
                        .setColor(data_.theme || config.colorConfig.Main)
                        .setDescription(`${config.emojiConfig.Right} ${lang.bot.blacklist.guild.deleted.replace('{guildName}', guild.name)}`);
                        return interaction.reply({ embeds: [removeGuildEmbed], ephemeral: true })
                    }
                } else if (type == 'user') {
                    const user = await client.users.fetch(ID);
                    const data = await blacklistdb.findOne({ guildId: interaction.guild.id, type: 'user' });
                    if (!data.blacklisted || data.blacklisted.id !== ID) {
                        return interaction.reply({ content: `${config.emojiConfig.Wrong} ${lang.bot.blacklist.error.errFour}`, ephemeral: true });
                    } else {
                        await blacklistdb.deleteOne({ 'blacklisted.id': user.id });
                        const removeGuildEmbed = new EmbedBuilder()
                        .setColor(data_.theme || config.colorConfig.Main)
                        .setDescription(`${config.emojiConfig.Right} ${lang.bot.blacklist.user.deleted.replace('{userName}', user)}`);
                        return interaction.reply({ embeds: [removeGuildEmbed], ephemeral: true })
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