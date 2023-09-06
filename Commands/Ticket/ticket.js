/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const { ChatInputCommandInteraction, Client, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ChannelType, ButtonStyle } = require("discord.js");
const { ticketdb, ticketLang, ticketLimit, ticketTrans, ticketTheme, ticketSettings } = require('../../Utils/models');
const { config } = require('../../Utils/settings');
const crypto = require('crypto');

module.exports = {
    admin: true,
    data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Create a Ticket System.')
    .addSubcommand(subcommand => 
        subcommand
        .setName('create')
        .setDescription('Create a ticket panel.')
        .addChannelOption(options =>
            options
            .setName('channel')
            .setDescription('Select a channel where the panel will be sent.')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
        .addRoleOption(options =>
            options
            .setName('role')
            .setDescription('Select a ticket support role.')
            .setRequired(true)
        )
        .addStringOption(options => 
            options
            .setName('button')
            .setDescription('Input a ticket button title.')
            .setRequired(true)
        )
        .addStringOption(options => 
            options
            .setName('btn_emoji')
            .setDescription('Input a ticket button emoji.')
            .setRequired(true)
        )
        .addStringOption(options =>
            options
            .setName('btn_style')
            .setDescription('Select a ticket button style.')
            .setRequired(true)
            .addChoices(
                { name: 'Primary', value: 'Primary' },
                { name: 'Secondary', value: 'Secondary' },
                { name: 'Danger', value: 'Danger' },
                { name: 'Success', value: 'Success' }
            )
        )
        .addStringOption(options =>
            options
            .setName('ticket_title')
            .setDescription('Input a embed title.')
            .setRequired(true)
        )
        .addStringOption(options =>
            options
            .setName('ticket_desc')
            .setDescription('Input a embed description.')
            .setRequired(true)
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('ticket_theme')
            .setDescription('Configure the bots color pallet.')
            .addStringOption(options =>
                options
                .setName('pallet')
                .setDescription('Select your prefered bot color pallet.')
                .setRequired(true)
                .addChoices(
                    { name: 'Default', value: 'White' },
                    { name: 'Red', value: 'Red' },
                    { name: 'Orange', value: 'Orange' },
                    { name: 'Yellow', value: 'Yellow' },
                    { name: 'Green', value: 'Green' },
                    { name: 'Purple', value: 'Purple' }
                )
            )
        )
        .addStringOption(options =>
            options
            .setName('ticket_img')
            .setDescription('Input a embed image.')
            .setRequired(false)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('add')
        .setDescription('Add a user from a ticket.')
        .addUserOption(options =>
            options
            .setName('user')
            .setDescription('Select a user to add.')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('remove')
        .setDescription('Remove a user from a ticket')
        .addUserOption(options =>
            options
            .setName('user')
            .setDescription('Select the user to remove.')
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
        const subcommandGroup = interaction.options.getSubcommandGroup();
        const findLang = await ticketLang.findOne({ guildId: interaction.guild.id });
        const lang = require(`../../Locales/${findLang?.language || 'en'}.js`);

        switch(subCommand) {
            case "create": {
                const channel = interaction.options.getChannel('channel');
                const role = interaction.options.getRole('role');
                const button = interaction.options.getString('button');
                const btnEmoji = interaction.options.getString('btn_emoji');
                const btnStyle = interaction.options.getString('btn_style');
                const o_title = interaction.options.getString('ticket_title');
                const o_desc = interaction.options.getString('ticket_desc');
                const o_img = interaction.options.getString('ticket_img');
                const o_theme = interaction.options.getString('ticket_theme')

                const data = await ticketdb.findOne({ guildId: interaction.guild.id });
                const openedPanel = await ticketdb.findOne({ guildId: interaction.guild.id, ownerId: interaction.user.id });
                const maxPanel = await ticketLimit.findOne({ guildId: interaction.guild.id });
                const data_ = await ticketLimit.findOne({ guildId: interaction.guild.id });

                let BtnStyle;
                if (btnStyle == 'Primary') {
                    BtnStyle == 'Primary'
                } else if (btnStyle == 'Secondary') {
                    BtnStyle == 'Secondary'
                } else if (btnStyle == 'Danger') {
                    BtnStyle == 'Danger'
                } else if (btnStyle == 'Success') {
                    BtnStyle == 'Success'
                };
                
                if (!data_) {
                    await ticketLimit.create({
                        guildId: interaction.guild.id,
                        maxTickets: 5,
                        maxTicketPanel: 5
                    });
                };

                if (openedPanel?.length >= maxPanel?.maxTicketPanel) {
                    const maxpanelBtn = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel(lang.bot.ticket.premium.button.label)
                        .setURL('https://discord.gg/kEhDxrV')
                        .setStyle(lang.bot.ticket.premium.button.style)
                    )

                    const maxpanelEmbed = new EmbedBuilder()
                    .setColor(config.colorConfig.Main)
                    .setDescription(`${config.emojiConfig.Wrong} ${lang.bot.ticket.premium.description}`)
                    return interaction.reply({ embeds: [maxpanelEmbed], components: [maxpanelBtn], ephemeral: true });
                } else {
                    const ticketEmbed = new EmbedBuilder()
                    .setColor(config.colorConfig.Main)
                    .setAuthor({ name: o_title || lang.bot.ticket.embed.title })
                    .setDescription(o_desc || lang.bot.ticket.embed.description)
                    .setImage(o_img || null)
                    .setFooter({ text: `${lang.bot.ticket.embed.footer}`, iconURL: client.user.displayAvatarURL() });

                    const ticketButton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel(button || lang.bot.ticket.button.label)
                        .setEmoji(btnEmoji ||"✉️")
                        .setStyle(BtnStyle ||lang.bot.ticket.button.style)
                        .setCustomId('ticket_create'),

                        new ButtonBuilder()
                        .setEmoji('1139077199169867858')
                        .setStyle(ButtonStyle.Secondary)
                        .setCustomId('edit_ticket')
                    );
                    
                    const sentEmbed = new EmbedBuilder()
                    .setColor(config.colorConfig.Main)
                    .setDescription(`${config.emojiConfig.Right} ${lang.bot.ticket.setup.created.replace('{channel}', channel)}`);
                    interaction.reply({ embeds: [sentEmbed], ephemeral: true });

                    client.channels.cache.get(channel.id).send({ embeds: [ticketEmbed], components: [ticketButton] });
                    
                    if (data) {
                        new ticketdb({
                            guildId: interaction.guild.id,
                            ownerId: interaction.user.id,
                            channelId: channel.id,
                            supportId: role.id,
                            panelId: createToken(4),
                            ticketTitle: o_title,
                            ticketDescription: o_desc.split('+n+').join('\n'),
                            ticketImage: o_img || null,
                            ticketBtn: button,
                            ticketEmoji: btnEmoji,
                            btnColor: BtnStyle,
                        }).save()
                    }
                    if (!data) {
                        new ticketdb({
                            guildId: interaction.guild.id,
                            ownerId: interaction.user.id,
                            channelId: channel.id,
                            supportId: role.id,
                            panelId: createToken(4),
                            ticketTitle: o_title,
                            ticketDescription: o_desc.split('+n+').join('\n'),
                            ticketImage: o_img || null,
                            ticketBtn: button,
                            ticketEmoji: btnEmoji,
                            btnColor: BtnStyle,

                        }).save()
                    }
                }   
            }
            break;
            case "add": {
                const user = interaction.options.getMember('user');
                const data = await isTicket(interaction);

                const errEmbed = new EmbedBuilder()
                .setColor(config.colorConfig.Error)
                .setDescription(`${config.emojiConfig.Rrong} ${lang.bot.ticket.addUser.channel_error}`)
                if (!data) return interaction.reply({ embeds: [errEmbed], ephemeral: true });

                const addErrorEmbed = new EmbedBuilder()
                .setColor(config.colorConfig.Error)
                .setDescription(`${config.emojiConfig.Wrong} ${lang.bot.ticket.addUser.already_added}`)
                if (data.usersinTicket.includes(user.id)) return interaction.reply({ embeds: [addErrorEmbed], ephemeral: true });

                data.usersinTicket.push(user.id);
                await data.save();

                await interaction.channel.permissionOverwrites.edit(user, {
                    SendMessages: true,
                    ViewChannel: true,
                    AttachFiles: true,
                    ReadMessageHistory: true
                });

                const successEmbed = new EmbedBuilder()
                .setColor(config.colorConfig.Main)
                .setDescription(`${config.emojiConfig.Right} ${lang.bot.ticket.addUser.added.replace('{addUser}', user)}`);
                await interaction.reply({ embeds: [successEmbed], ephemeral: true });
            }
            break;
            case "remove": {
                const user = interaction.options.getMember('user');
                const data = await isTicket(interaction);

                const errEmbed = new EmbedBuilder()
                .setColor(config.colorConfig.Error)
                .setDescription(`${config.emojiConfig.Wrong} ${lang.bot.ticket.revUser.channel_error}`)
                if (!data) return interaction.reply({ embeds: [errEmbed], ephemeral: true });

                const addErrorEmbed = new EmbedBuilder()
                .setColor(config.colorConfig.Error)
                .setDescription(`${config.emojiConfig.Wrong} ${lang.bot.ticket.revUser.user_doesnt_exist}`)
                if (!data.usersinTicket.includes(user.id)) return interaction.reply({ embeds: [addErrorEmbed], ephemeral: true });

                data.usersinTicket.splice(data.usersinTicket.indexOf(user.id), 1);
                await data.save();

                await interaction.channel.permissionOverwrites.edit(user, {
                    SendMessages: false,
                    ViewChannel: false,
                    AttachFiles: false,
                    ReadMessageHistory: false
                });

                const successEmbed = new EmbedBuilder()
                .setColor(config.colorConfig.Main)
                .setDescription(`${config.emojiConfig.Right} ${lang.bot.ticket.revUser.removed.replace('{revUser}', user)}`);
                await interaction.reply({ embeds: [successEmbed], ephemeral: true });
            }
            break;
        }

        if (subcommandGroup == 'settings') {
            if (subCommand == 'dm_transcript') {
                const option = interaction.options.getString('option');
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

                    const dmTranscript = new EmbedBuilder()
                    .setColor(config.colorConfig.Main)
                    .setDescription(`${config.emojiConfig.Right} ${lang.bot.setup.dmTranscript.set.replace('{toggle}', option)}`);
                    await interaction.reply({ embeds: [dmTranscript], ephemeral: true });
                } else {
                    await ticketdb.updateOne({ guildId: interaction.guild.id, panelId: panelId }, { $set: { DMTranscript: option } }).catch((err) => { console.log(err) });

                    const dmTranscript = new EmbedBuilder()
                    .setColor(config.colorConfig.Main)
                    .setDescription(`${config.emojiConfig.Right} ${lang.bot.setup.dmTranscript.changed.replace('{toggle}', option)}`);
                    await interaction.reply({ embeds: [dmTranscript], ephemeral: true });
                }
            } else if (subCommand == 'theme') {
                const pallet = interaction.options.getString('pallet');
                let color;

                if (pallet == 'White') {
                    color = '#FFFFFF'
                } else if (pallet == 'Red') {
                    color = '#ED4245'
                } else if (pallet == 'Orange') {
                    color = '#E67E22'
                } else if (pallet == 'Yellow') {
                    color = '#FFFF00'
                } else if (pallet == 'Green') {
                    color = '#2ECC71'
                } else if (pallet == 'Purple') {
                    color = '#9B59B6'
                }
                
                const data = await ticketTheme.findOne({ guildId: interaction.guild.id });
                if (!data) {
                    await ticketTheme.create({
                        guildId: interaction.guild.id,
                        theme: color
                    })

                    const palletEmbed = new EmbedBuilder()
                    .setColor(pallet || config.colorConfig.Main)
                    .setDescription(`${config.emojiConfig.Right} ${lang.bot.setup.pallet.description.replace('{pallet}', pallet)}`)
            
                    await interaction.reply({ embeds: [palletEmbed], ephemeral: true })
                } else {
                    await ticketTheme.updateOne({ guildId: interaction.guild.id }, { $set: { theme: color } });

                    const palletEmbed = new EmbedBuilder()
                    .setColor(pallet || config.colorConfig.Main)
                    .setDescription(`${config.emojiConfig.Right} ${lang.bot.setup.pallet.description.replace('{pallet}', pallet)}`)
            
                    await interaction.reply({ embeds: [palletEmbed], ephemeral: true })
                }
            } 
        }
    }
}

async function isTicket(interaction) {
    const userdata = ticketdb.findOne({ channelId: interaction.channel.id })

    if (!userdata) {
        return false
    } else {
        return userdata
    }
}

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

/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/