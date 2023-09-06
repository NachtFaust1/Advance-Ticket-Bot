/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const { loadInteraction } = require("../../Handlers/InteractionLoader");
const { config } = require('../../Utils/settings');

module.exports = {
  name: "ready",
  once: true,
  
  execute(client) {
    setInterval(() => {
      client.user.setPresence({
        activities: [
          {
            name: `${config.activityConfig.Activities}`,
            type: `${config.activityConfig.Type}`,
          },
        ],
        status: `${config.activityConfig.Status}`,
      });
    }, 15000);

    loadInteraction(client);

    setTimeout(() => {
      console.log(`---------------------------------------------`);
      console.info(`${client.user.username.toUpperCase()} IS NOW ONLINE `, '[ INFO - BOT ]');
      console.log(`---------------------------------------------`);
    }, 3000);
  },
};

/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/