const { Client, GatewayIntentBits, Events } = require("discord.js");

const config = require("./config");

const client = new Client({
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages
   ]
});

client.once(Events.ClientReady, c => {
   console.log(`[CLIENT] - Logged in as ${c.user.tag} (ID: ${c.user.id})`);
});

client.login(config.bot.token);
