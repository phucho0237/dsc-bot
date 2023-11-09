const { Client, GatewayIntentBits, Collection, Events } = require("discord.js");

const config = require("./config");

const client = new Client({
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages
   ]
});

client.commands = new Collection();

client.once(Events.ClientReady, c => {
   console.log(`[CLIENT] - Logged in as ${c.user.tag} (ID: ${c.user.id})`);
});

["commands"].forEach(handler => require(`./handlers/${handler}`)(client));

client.login(config.bot.token);
