/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const { readFileSync } = require('fs');
const { load } = require('js-yaml');
const config = load(readFileSync('config.yml', 'utf8'));

async function buttonPage(interaction, pages, time = 120000) {
  if (!interaction) throw new Error("Please provide an interaction argument");
  if (!pages) throw new Error("Please provide a page argument");
  if (!Array.isArray(pages)) throw new Error("Pages must be an array");

  if (typeof time !== "number") throw new Error("Time must be a number");
  if (parseInt(time) < 30000)
    throw new Error("Time must be greater then 30 seconds");

  await interaction.deferReply();

  if (pages.length === 1) {
    const page = await interaction.editReply({
      content: `**Use the __Buttons__ below, to swap the Pages!**`,
      embeds: pages,
      components: [],
      fetchReply: true,
    });

    return page;
  }

  const prev = new ButtonBuilder()
    .setCustomId("prev")
    .setEmoji("1006772516762685531")
    .setStyle(ButtonStyle.Secondary)
    .setLabel("Back")
    .setDisabled(true);

  const home = new ButtonBuilder()
    .setCustomId("home")
    .setEmoji("1016880287583576174")
    .setStyle(ButtonStyle.Secondary)
    .setLabel("Home")
    .setDisabled(true);

  const next = new ButtonBuilder()
    .setCustomId("next")
    .setEmoji("1006772441110024192")
    .setStyle(ButtonStyle.Secondary)
    .setLabel("Next");

  const buttonRow = new ActionRowBuilder().addComponents(prev, home, next);
  let index = 0;

  const currentPage = await interaction.editReply({
    content: `**Use the __Buttons__ below, to swap the Pages!**`,
    embeds: [pages[index]],
    components: [buttonRow],
  });

  const collector = await currentPage.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time,
  });

  collector.on("collect", async (i) => {
    if (i.user.id !== interaction.user.id)
      return i.reply({
        content: `${config.emojiConfig.Wrong} You can't use this button`,
        ephemeral: true,
      });

    await i.deferUpdate();

    if (i.customId === "prev") {
      if (index > 0) index--;
    } else if (i.customId === "home") {
      index = 0;
    } else if (i.customId === "next") {
      if (index < pages.length - 1) index++;
    }

    if (index === 0) prev.setDisabled(true);
    else prev.setDisabled(false);

    if (index === 0) home.setDisabled(true);
    else home.setDisabled(false);

    if (index === pages.length - 1) next.setDisabled(true);
    else next.setDisabled(false);

    await currentPage.edit({
      embeds: [pages[index]],
      components: [buttonRow],
    });

    collector.resetTimer();
  });

  collector.on("end", async (i) => {
    await currentPage.edit({
      content: `${config.emojiConfig.Wrong} ***Time has ended, type \`/help\` again!***`,
      embeds: [pages[index]],
      components: [],
    });
  });
  return currentPage;
}

module.exports = { buttonPage }


/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/