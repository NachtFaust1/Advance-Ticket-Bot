/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const blacklistdb = require('../../Models/Blacklist');

const { readFileSync } = require('fs');
const { load } = require('js-yaml');
const config = load(readFileSync('config.yml', 'utf8'));

module.exports = {
  name: "interactionCreate",

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return interaction.reply({ content: `${config.emojiConfig.Wrong} *This Command is Outdated.*`, ephemeral: true });

    if (command.developer && interaction.user.id !== "928640467619434526") {
      return interaction.reply({ content: `${config.emojiConfig.Wrong} *Only the Developer can use this command*`, ephemeral: true });
    }

    if (command.admin && !interaction.member.permissions.has("Administrator")) {
      return interaction.reply({ content: `${config.emojiConfig.Wrong} *You cannot use this command*`, ephemeral: true });
    }

    if (command.botPerms && command.botPerms.length !== 0)
      if (!interaction.guild.members.me.permissions.has(command.botPerms)) {
        return interaction.reply({ content: `I need \`${command.BotPerms.join(", ")}\` permission(s) to execute this command!`, ephemeral: true });
      }

    const data_ = await blacklistdb.findOne({ guildId: interaction.guild.id });

      if (data_?.blacklisted.id.includes(interaction.guild.id)) {
        const guildEmbed = new EmbedBuilder()
        .setColor('Red')
        .setAuthor({ name: `Blacklisted` })
        .setDescription(`*Your server has been blacklisted from using this bot.*`)
        return interaction.reply({ embeds: [guildEmbed], ephemeral: true });

      } else if (data_?.blacklisted.id.includes(interaction.user.id)) {
        const userEmbed = new EmbedBuilder()
        .setColor('Red')
        .setAuthor({ name: `Blacklisted` })
        .setDescription(`*You have been blacklisted from using this bot.*`)
        return interaction.reply({ embeds: [userEmbed], ephemeral: true });
      };

    command.execute(interaction, client);
  },
};


/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/