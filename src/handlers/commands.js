const fs = require("fs");
const { REST, Routes } = require("discord.js");
const colors = require("colors");

const config = require("../config");

module.exports = client => {
   let commandsArray = [];

   const commandFolders = fs.readdirSync("./src/commands");

   for (const folder of commandFolders) {
      const commandFiles = fs
         .readdirSync(`./src/commands/${folder}`)
         .filter(f => f.endsWith(".js"));

      for (const file of commandFiles) {
         const command = require(`../commands/${folder}/${file}`);

         client.commands.set(command.data.name, command);

         commandsArray.push(command.data.toJSON());
      }
   }

   const rest = new REST().setToken(config.bot.token);

   (async () => {
      try {
         const data = await rest.put(
            Routes.applicationCommands(config.bot.clientId),
            { body: commandsArray }
         );

         console.log(`[COMMAND] - Refreshed ${data.length} command(s)`.yellow);
      } catch (err) {
         console.error(err);
      }
   })();
};
