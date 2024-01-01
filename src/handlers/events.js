const fs = require("fs");
const colors = require("colors");

module.exports = client => {
   let eventsArray = [];

   const eventFolders = fs.readdirSync("./src/events");

   for (const folder of eventFolders) {
      const eventFiles = fs
         .readdirSync(`./src/events/${folder}`)
         .filter(f => f.endsWith(".js"));

      for (const file of eventFiles) {
         const event = require(`../events/${folder}/${file}`);

         if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
         } else {
            client.on(event.name, (...args) => event.execute(...args));
         }

         eventsArray.push(event.name);
      }
   }

   console.log(`[EVENT] - Refreshed ${eventsArray.length} event(s)`.yellow);
};
