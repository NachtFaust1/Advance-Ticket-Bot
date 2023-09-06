/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { ticketLimit } = require('../../Utils/models');
const { config } = require('../../Utils/settings');

module.exports = {
  name: "guildCreate",

  async execute(guild, client) {
    
    const data = await ticketLimit.findOne({ guildId: guild.id });
    if (!data) {
      await ticketLimit.create({
        guildId: guild.id,
        maxTickets: 5,
        maxTicketPanel: 5,
      });
    }

    try {
      const invButton = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=1047802082293469244&permissions=8&scope=bot%20applications.commands`)
          .setLabel("Invite Me")
          .setStyle(ButtonStyle.Link)
      );

      const invEmbed = new EmbedBuilder()
        .setColor(client.config.color.main)
        .setAuthor({ name: `${guild.name}`, iconURL: guild.iconURL() })
        .setDescription(`*Hey this is **${client.user.username}**, Thanks for inviting me to your server as it means a lot to us! You can get started with \`/\` & start ticketing!*`)
        .addFields({ name: `Need Help?`, value: `Check out Ticket Bots [support server](${config.aboutConfig.supportServer})` });

      guild.systemChannel.send({ embeds: [invEmbed], components: [invButton] });
    } catch (_) {}
  },
};

/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/