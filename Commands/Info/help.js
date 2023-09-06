/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const { ChatInputCommandInteraction, Client, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { ticketLang, ticketTheme } = require('../../Utils/models');
const { config } = require('../../Utils/settings');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('View the help menu.'),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     * @returns 
     */
    async execute(interaction, client) {
        const findLang = await ticketLang.findOne({ guildId: interaction.guild.id });
        const lang = require(`../../Locales/${findLang?.language || "en"}.js`);
        const data = await ticketTheme.findOne({ guildId: interaction.guild.id });

        const date = new Date();
        const timeStamp = date.getTime() - Math.floor(client.uptime);

        let apiLatency = client.ws.ping;

        let emLatency = {
          Green: `${lang.bot.ping.green}`,
          Yellow: `${lang.bot.ping.yellow}`,
          Red: `${lang.bot.ping.red}`,
        };

        const helpBtn = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel('Invite Url')
            .setURL('https://discord.com/api/oauth2/authorize?client_id=1131153510432518154&permissions=8&scope=bot'),

            new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel('Vote Bot')
            .setURL('https://top.gg/bot/1054206405936173126/vote'),

            new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel('Support Server')
            .setURL('https://discord.gg/jWgjguYwZd')
        )

        const helpEmbed = new EmbedBuilder()
        .setColor(data?.theme || config.colorConfig.Main)
        .setAuthor({ name: "Ticket Prime Commands", iconURL: client.user.displayAvatarURL() })
        .setDescription(`*The best ticket bot presently accessible on Discord, featuring high convenient transcripts, customizable language, high performance, blacklisting and many more.*`)
        .addFields(
            { name: "All Commands:", value: `>>> \`blacklist\` \`language\` \`lock\` \`unlock\` \`new\` \`theme\` \`transcript\` \`add\` \`remove\` \`autoclose\`` }
        )
        .addFields(
            { name: "Bot Information", value: `>>> Ping: \`${apiLatency <= 200 ? emLatency.Green : apiLatency <= 400 ? emLatency.Yellow : emLatency.Red} - ${apiLatency}ms\`\nUptime: <t:${Math.floor(timeStamp / 1000)}:F>\nVersion: \`v1.1.0 (07/21/23)\`` },
        )
        .addFields(
            { name: "Links:", value: `>>> [Bot Invite Link](https://discord.com/api/oauth2/authorize?client_id=1131153510432518154&permissions=8&scope=bot)\n[Vote on Top.gg](https://top.gg/bot/1054206405936173126/vote)\n[Support Server](https://discord.gg/jWgjguYwZd)`}
        )
        .setFooter({ text: `Ticket Prime | Ticketing with clutter`, iconURL: client.user.displayAvatarURL() });

        return interaction.reply({ embeds: [helpEmbed], components: [helpBtn] });
    }
}

/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/