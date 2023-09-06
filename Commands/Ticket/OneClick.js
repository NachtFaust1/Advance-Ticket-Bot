/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const { ChatInputCommandInteraction, Client, SlashCommandBuilder, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { ticketdb, ticketLang, ticketOpen, ticketTheme } = require('../../Utils/models');
const { config } = require('../../Utils/settings');
const dayjs = require('dayjs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('new')
    .setDescription('Creates a ticket with just one click.'),

    /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
    async execute(interaction, client) {
        const ID = Math.floor(Math.random() * 2000) + 2000;
        const ticketDate = dayjs(Date.now()).unix();

        const [ticketConfig, findLang, colorData] = await Promise.all([
            ticketdb.findOne({ guildId: interaction.guild.id }),
            ticketLang.findOne({ guildId: interaction.guild.id }),
            ticketTheme.findOne({ guildId: interaction.guild.id }),
        ]);

        const lang = require(`../../Locales/${findLang?.language || 'en'}.js`);
        const { categoryId } = ticketConfig ?? {};

        const data = await ticketdb.findOne({ guildId: interaction.guild.id });
        if (!data) {
            const errEmbed = new EmbedBuilder()
            .setColor(config.colorConfig.Error)
            .setDescription(`${config.emojiConfig.Wrong} ${lang.bot.new.error1}`)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });
        } else {
            await interaction.reply({ content: `*Creating your ticket...*`, ephemeral: true });

            const channelPerms = [
                'ViewChannel',
                'SendMessages',
                'ReadMessageHistory',
                'UseApplicationCommands'
            ];
    
            const channel = await interaction.guild.channels.create({
                name: `${lang.bot.new.create.channelName} - ${ID}`,
                topic: `${lang.bot.new.create.channelTopic} :: ${interaction.user.tag} / (${interaction.user.id})`,
                parent: categoryId || null,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [channelPerms]
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['ViewChannel']
                    }
                ]
            });
    
            if (channel) {
                const ticketEmbed = new EmbedBuilder()
                .setColor(colorData?.theme || config.colorConfig.Main)
                .setAuthor({ name: `${lang.bot.new.embed.title.replace('{userTag}', interaction.user.tag)}`, iconURL: interaction.user.displayAvatarURL() })
                .setDescription(`${lang.bot.new.embed.description}`)
                .setFooter({ text: `${lang.bot.new.embed.footer}`, iconURL: client.user.displayAvatarURL() });
    
                const ticketButton = new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                  .setCustomId("close_ticket")
                  .setEmoji(lang.bot.ticketCreate.button.close.emoji)
                  .setLabel(lang.bot.ticketCreate.button.close.label)
                  .setStyle(lang.bot.ticketCreate.button.close.style),
                  new ButtonBuilder()
                  .setCustomId('claim_ticket')
                  .setEmoji(lang.bot.ticketCreate.button.claim.emoji)
                  .setLabel(lang.bot.ticketCreate.button.claim.label)
                  .setStyle(lang.bot.ticketCreate.button.claim.style),
                  new ButtonBuilder()
                  .setCustomId('transcript-ticket')
                  .setEmoji(lang.bot.ticketCreate.button.transcript.emoji)
                  .setLabel(lang.bot.ticketCreate.button.transcript.label)
                  .setStyle(lang.bot.ticketCreate.button.transcript.style)
                );
    
                await channel.send({ content: `:wave: <@${interaction.user.id}>`, embeds: [ticketEmbed], components: [ticketButton] });
    
                await ticketOpen.create({
                    guildId: interaction.guild.id,
                    openerId: interaction.user.id,
                    isTicketNew: true,
                    channelId: channel.id,
                    date: ticketDate
                });
    
                return interaction.editReply({ content: `*${lang.bot.ticketCreate.ticketCreated} - <#${channel.id}>*`, ephemeral: true });
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