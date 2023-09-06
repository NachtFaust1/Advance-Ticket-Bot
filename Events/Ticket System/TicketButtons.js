/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');
const { ticketdb, ticketOpen, ticketTrans, ticketTheme, ticketLang } = require('../../Utils/models');
const { config } = require('../../Utils/settings');

let logs;
let transcriptFile;

module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {
        if (!interaction.isButton()) return;
        if (interaction.replied || interaction.deferred) return;

        const logsData = await ticketTrans.findOne({ guildId: interaction.guild.id });
        logs = logsData?.channelId || null;

        const [themeConfig, findLang] = await Promise.all([
            ticketTheme.findOne({ guildId: interaction.guild.id }),
            ticketLang.findOne({ guildId: interaction.guild.id })
        ]);

        const lang = require(`../../Locales/${findLang?.language || 'en'}.js`);
        const { theme } = themeConfig ?? {};

        if (interaction.customId == 'close_ticket') {
            const [data, userData] = await Promise.all([
                ticketOpen.findOne({ guildId: interaction.guild.id }),
                ticketdb.findOne({ guildId: interaction.guild.id }),
            ])

            const { supportId, DMTranscript } = userData ?? {};
            const [opener, channel] = await Promise.all([ client.users.fetch(data.openerId), interaction.channel ]);

            const errEmbed = new EmbedBuilder()
            .setColor(config.colorConfig.Error)
            .setDescription(`${config.emojiConfig.Wrong} ${lang.bot.ticketDelete.deleteErrors.one}`);
            if (!data) return interaction.reply({ embeds: [errEmbed], ephemeral: true });

            const errEmbed_ = new EmbedBuilder()
            .setColor(config.colorConfig.Error)
            .setDescription(`${config.emojiConfig.Wrong} ${lang.bot.ticketDelete.deleteErrors.two.replace('{support}', `<@&${supportId}>`)}`);
            if (!interaction.member.roles.cache.has(supportId)) return interaction.reply({ embeds: [errEmbed_], ephemeral: true });

            await closeTicket(channel);

            const transcriptEmbed = new EmbedBuilder()
            .setColor(theme || config.colorConfig.Main)
            .setAuthor({ name: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
            .addFields(
                { name: `${lang.bot.ticketDelete.fields.one.name}`, value: `${lang.bot.ticketDelete.fields.one.value}` },
            )
            .addFields(
                { name: `${config.emojiConfig.Opened} ${lang.bot.ticketDelete.fields.two}`, value: `<@${data.openerId}>`, inline: true },
                { name: `${config.emojiConfig.TicketID} ${lang.bot.ticketDelete.fields.three}`, value: `\`${interaction.channel.name}\``, inline: true },
                { name: `${config.emojiConfig.Closed} ${lang.bot.ticketDelete.fields.four}`, value: `${interaction.user}`, inline: true },
                { name: `${config.emojiConfig.OpenTime} ${lang.bot.ticketDelete.fields.five}`, value: `<t:${data.date}:R>`, inline: true }
            )
            .setFooter({ text: `${lang.bot.ticketDelete.footer}`, iconURL: client.user.displayAvatarURL() });

            if (DMTranscript == true) {
                opener.send({ embeds: [transcriptEmbed], files: [transcriptFile] }).catch(() => { });
            }

            setTimeout(async () => {
                await data.deleteOne();
            }, 3000)
            await interaction.channel.delete();
        } else if (interaction.customId == 'claim_ticket') {
            let variable;
            const isTicketNew = true;

            if (isTicketNew) {
                variable = 'new_close_ticket';
            } else {
                variable = 'close_ticket';
            };

            const updatedTicketBtn = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setCustomId(variable)
                .setEmoji(lang.bot.ticketCreate.button.close.emoji)
                .setLabel(lang.bot.ticketCreate.button.close.label)
                .setStyle(lang.bot.ticketCreate.button.close.style),
              new ButtonBuilder()
                .setCustomId('claim_ticket')
                .setEmoji(lang.bot.ticketCreate.button.claim.emoji)
                .setLabel(lang.bot.ticketCreate.button.claim.label)
                .setStyle(lang.bot.ticketCreate.button.claim.style)
                .setDisabled(true),
              new ButtonBuilder()
                .setCustomId('transcript-ticket')
                .setEmoji(lang.bot.ticketCreate.button.transcript.emoji)
                .setLabel(lang.bot.ticketCreate.button.transcript.label)
                .setStyle(lang.bot.ticketCreate.button.transcript.style)
            );

            const updatePromise = interaction.update({ components: [updatedTicketBtn] });

            const dbPromise = ticketOpen.updateOne({ guildId: interaction.guild.id, channelId: interaction.channel.id }, { $set: { isClaimed: true, staffClaimed: interaction.user.id } }, { upsert: true } );
            
            await Promise.all([updatePromise, dbPromise]);
            return interaction.followUp({ embeds: [
                new EmbedBuilder()
                .setColor(config.colorConfig.Main)
                .setDescription(`${config.emojiConfig.right} ${lang.bot.ticketClaim.successClaim}`)
            ], ephemeral: true });
        } else if (interaction.customId == 'transcript-ticket') {
            const [data, transcriptData] = await Promise.all([
                ticketOpen.findOne({ guildId: interaction.guild.id }),
                ticketTrans.findOne({ guildId: interaction.guild.id }),
            ]);

            if (!data || !transcriptData) {
                let errMessages = [];
                if (!data) {
                    errMessages.push(`${config.emojiConfig.wrong} ${lang.bot.ticketTranscript.transcriptError.one}`);
                };
                if (!transcriptData) {
                    errMessages.push(`${config.emojiConfig.wrong} ${lang.bot.ticketTranscript.transcriptError.two}`);
                };

                const errEmbed = new EmbedBuilder()
                .setColor(config.colorConfig.Error)
                .setDescription(errMessages.join('\n'));

                return interaction.reply({ embeds: [errEmbed], ephemeral: true });
            }

            const transcriptChannel = await client.channels.cache.get(transcriptData?.channelId);
            const channel = interaction.channel;

            await closeTicket(channel);

            const transcriptSaved = new EmbedBuilder()
            .setColor(theme || config.colorConfig.Main)
            .setDescription(`${config.emojiConfig.Right} ${lang.bot.ticketTranscript.successTranscript.replace('{transcriptChannel}', transcriptChannel)}`);

            const transcriptSEmbed = new EmbedBuilder()
            .setColor(theme || config.colorConfig.main)
            .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .addFields(
                { name: `${config.emojiConfig.Opened} ${lang.bot.ticketTranscript.fields.one}`, value: `<@${data.openerId}>`, inline: true },
                { name: `${config.emojiConfig.TicketID} ${lang.bot.ticketTranscript.fields.two}`, value: `\`${interaction.channel.name}\``, inline: true },
                { name: `${config.emojiConfig.Closed} ${lang.bot.ticketTranscript.fields.three}`, value: `${interaction.user}`, inline: true },
                { name: `${config.emojiConfig.OpenTime} ${lang.bot.ticketTranscript.fields.four}`, value: `<t:${data.date}:R>`, inline: true }
            )
            .setFooter({ text: `${lang.bot.ticketTranscript.footer}`, iconURL: interaction.guild.iconURL() });

            data.isTranscript = true;
            await data.save();

            await interaction.reply({ embeds: [transcriptSaved], ephemeral: true });

            if (data.isTranscript && logs) {
                const transcriptChannel = interaction.guild.channels.cache.get(logs);

                if (transcriptChannel) {
                    await transcriptChannel.send({ embeds: [transcriptSEmbed], files: [transcriptFile] });
                }
            }
        } else if (interaction.customId === 'new_close_ticket') {
            const [data2, userData] = await Promise.all([
                ticketOpen.findOne({ guildId: interaction.guild.id, channelId: interaction.channel.id }),
                ticketdb.findOne({ guildId: interaction.guild.id }),
            ]);

            const { DMTranscript } = userData ?? {};

            const [opener, channel] = await Promise.all([ client.users.fetch(data2.openerId), interaction.channel ]);

            if (!data2) {                
                const errEmbed3 = new EmbedBuilder()
                  .setColor(config.colorConfig.Error)
                  .setDescription(`${config.emojiConfig.Wrong} ${lang.bot.ticketDelete.deleteErrors.one}`);
                return interaction.editReply({ embeds: [errEmbed3], ephemeral: true });
            };

            await closeTicket(channel);

            const transcriptEmbed = new EmbedBuilder()
            .setColor(theme || config.colorConfig.Main)
            .setAuthor({ name: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
            .addFields(
                { name: `${lang.bot.ticketDelete.fields.one.name}`, value: `${lang.bot.ticketDelete.fields.one.value}` },
            )
            .addFields(
                { name: `${config.emojiConfig.Opened} ${lang.bot.ticketDelete.fields.two}`, value: `<@${data2.openerId}>`, inline: true },
                { name: `${config.emojiConfig.TicketID} ${lang.bot.ticketDelete.fields.three}`, value: `\`${interaction.channel.name}\``, inline: true },
                { name: `${config.emojiConfig.Closed} ${lang.bot.ticketDelete.fields.four}`, value: `${interaction.user}`, inline: true },
                { name: `${config.emojiConfig.OpenTime} ${lang.bot.ticketDelete.fields.five}`, value: `<t:${data2.date}:R>`, inline: true }
            )
            .setFooter({ text: `${lang.bot.ticketDelete.footer}`, iconURL: client.user.displayAvatarURL() });

            if (DMTranscript == true) {
                opener.send({ embeds: [transcriptEmbed], files: [transcriptFile] }).catch(() => { });
            }

            setTimeout(async () => {
                await data2.deleteOne();
            }, 3000);
            await interaction.channel.delete();
        }
    }
}

async function closeTicket(channel) {
    transcriptFile = await createTranscript(channel,
        {
            limit: -1,
            returnType: 'attachment',
            fileName: `transcript-${channel.name}.html`,
            minify: true,
            poweredBy: false
        }
    )
}

/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/