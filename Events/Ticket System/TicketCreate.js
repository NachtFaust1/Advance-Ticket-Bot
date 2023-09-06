/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ChannelType } = require("discord.js");
const { ticketdb, ticketOpen, ticketLimit, ticketTheme, ticketLang } = require('../../Utils/models');
const { config } = require('../../Utils/settings');

const dayjs = require('dayjs');

module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {
        if (!interaction.isButton()) return;

        if (interaction.replied || interaction.deferred) return;

        const [ ticketConfig, themeConfig, limitConfig, openedTickets, findLang ] = await Promise.all([ 
            ticketdb.findOne({ guildId: interaction.guild.id }),
            ticketOpen.findOne({ guildid: interaction.guild.id }),
            ticketLimit.findOne({ guildId: interaction.guild.id }),
            ticketTheme.findOne({ guildId: interaction.guild.id }),
            ticketLang.findOne({ guildId: interaction.guild.id }),
        ]);

        const { supportId, ticketTitle, ticketDescription } = ticketConfig ?? {};
        const { maxTickets } = limitConfig ?? {};
        const { theme } = themeConfig ?? {};

        const lang = require(`../../Locales/${findLang?.language || 'en'}.js`);
        const ticketDate = dayjs(Date.now()).unix();

        if (interaction.customId === 'ticket_create') {
            await interaction.reply({ content: `*Creating your ticket...*`, ephemeral: true });

            if (openedTickets?.length >= maxTickets) {
                const maxPanelBtn = new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                  .setLabel(lang.bot.ticketCreate.ticketPremium.button.label)
                  .setURL(`https://discord.gg/kEhDxrV`)
                  .setStyle(lang.bot.ticketCreate.ticketPremium.button.style)
                );
    
                const maxTicketEmbed = new EmbedBuilder()
                .setColor(config.colorConfig.Error)
                .setDescription(`${config.emojiConfig.Wrong} ${lang.bot.ticketCreate.ticketPremium.description}`);
    
              return interaction.reply({ embeds: [maxTicketEmbed], components: [maxPanelBtn], ephemeral: true });
            }

            const channelPerms = [
                'ViewChannel',
                'SendMessages',
                'ReadMessageHistory',
                'UseApplicationCommands'
            ];

            const channel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                parent: categoryId || null,
                topic: `${lang.bot.ticketCreate.ticketTopic} :: ${interaction.user.tag} / (${interaction.user.id})`,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [channelPerms]
                    },
                    {
                        id: supportId,
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
                .setColor(theme || config.colorConfig.Main)
                .setAuthor({ name: `${ticketTitle || `${lang.bot.ticketCreate.ticketTitle} ${interaction.user.tag}`}`, iconURL: interaction.user.displayAvatarURL() })
                .setDescription(`${ticketDescription || `${lang.bot.ticket.embed.openMessage}`}`)
                .setFooter({ text: `${lang.bot.ticketCreate.ticketFooter}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp();

                const ticketBtn = new ActionRowBuilder()
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

                await channel.send({ content: `:wave: ${interaction.user} | <@&${supportId}>`, embeds: [ticketEmbed], components: [ticketBtn] });

                await ticketOpen.create({
                    guildId: interaction.guild.id,
                    openerId: interaction.user.id,
                    isTicketNew: false,
                    channelId: channel.id,
                    date: ticketDate
                });

                return interaction.editReply({ content: `*${lang.bot.ticketCreate.ticketCreated} - <#${channel.id}>*`, ephemeral: true });
            } else {
                return interaction.reply({ content: `${config.emojiConfig.Wrong} ${lang.bot.ticketCreate.ticketError}`, ephemeral: true });
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