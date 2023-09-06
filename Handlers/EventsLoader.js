/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

const { loadFiles } = require('../Functions/FileLoader')

async function loadEvents(client) {

  await client.events.clear();
  const events = new Array()

  const files = await loadFiles("Events")

  for (const file of files) {
    try {
      const event = require(file)
      const execute = (...args) => event.execute(...args, client)
      const target = event.rest ? client.rest : client
  
      target[event.once ? 'once' : 'on'](event.name, execute)
      client.events.set(event.name, execute)
  
      events.push({ Event: event.name, Status: '✅' })
    } catch (err) {
      events.push({ Event: file.split('/').pop().slice(0, -3), Status: '🟥' })
    }
  }

  console.table(events, ['Event', 'Status'])
  console.info('Loaded Events', '[ Events ]')
}

module.exports = { loadEvents } 

/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/