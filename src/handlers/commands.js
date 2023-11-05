const fs = require("fs");
const { REST, Routes } = require("discord.js");

const config = require("../config");

module.exports = client => {
   const commandsArray = [];

   const commandFolders = fs.readdirSync("./src/commands");

   for (const folder of commandFolders) {
      const commandFiles = fs
         .readdirSync(`./src/commands/${folder}`)
         .filter(f => f.endsWith(".js"));

      for (const file of commandFiles) {
         const command = require(`../commands/${dir}/${file}`);

         commandsArray.push(command.data.toJSON());
      }
   }

   const rest = new REST().setToken(config.bot.token);

   (async () => {
      try {
         console.log(
            `[COMMAND] - Started refreshing ${commandsArray.length} application (/) commands`
         );

         const data = await rest.put(
            Routes.applicationCommands(config.bot.token),
            { body: { commandsArray } }
         );

         console.log(
            `Successfully reloaded ${data.length} application (/) commands`
         );
      } catch (err) {
         console.error(err);
      }
   })();
};
