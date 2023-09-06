/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const { loadFiles } = require("../Functions/FileLoader");

async function loadInteraction(client) {
  const commands = new Array();
  await client.commands.clear();

  let commandsArray = [];

  const files = await loadFiles("Commands");

  for (const file of files) {
    try {
      const command = require(file);
      client.commands.set(command.data.name, command);

      commandsArray.push(command.data.toJSON());

      commands.push({ Command: command.data.name, Status: "✅"});
    } catch (error) {
      commands.push({ Command: file.split("/").pop().slice(0, -3), Status: "🟥"});
      console.error(error)
    }

  }
  await client.application.commands.set(commandsArray);

	console.table(commands, ["Command", "Status"]);
	console.info("Commands loaded.", "[ Commands ]");
}

module.exports = { loadInteraction };

/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/