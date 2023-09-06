/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const { ChatInputCommandInteraction, Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder } = require("discord.js");
const { ticketLang, ticketTheme } = require('../../Utils/models');
const { config } = require('../../Utils/settings');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Invite the bot to your server"),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {

    const findLang = await ticketLang.findOne({ guildId: interaction.guild.id });
    const lang = require(`../../Locales/${findLang?.language || "en"}.js`);

    const data = await ticketTheme.findOne({ guildId: interaction.guild.id });

    const inviteEmbed = new EmbedBuilder()
    .setColor(data?.theme || config.colorConfig.Main)
    .setDescription(`${lang.bot.invite.description.replace('{clientUser}', client.user).replace('{clientAbout}', config.aboutConfig.botAbout)}`)
    .setFooter({ text: `${lang.bot.invite.footer.replace('{client}', client.user.username)}` });

    const invitebutton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
      .setLabel(`${lang.bot.invite.button.label}`)
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
      .setStyle(lang.bot.invite.button.style)
    );

    return interaction.reply({ embeds: [inviteEmbed], components: [invitebutton] });
  },
};

/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/