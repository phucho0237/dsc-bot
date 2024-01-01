const { Events, Client } = require("discord.js");
const mongoose = require("mongoose");

const config = require("../../config");

module.exports = {
   name: Events.ClientReady,
   once: true,
   /**
    *
    * @param {Client} client
    */
   execute(client) {
      console.log(
         `[CLIENT] - Logged in as ${client.user.tag} (ID: ${client.user.id})`
      );

      if (!config.db.url)
         return console.log(
            "[MONGODB] - No connection string provided, some bot features will not work"
         );

      mongoose
         .connect(config.db.url)
         .then(() => console.log("[MONGODB] - Connected to database"))
         .catch(err => console.error(err));
   }
};
