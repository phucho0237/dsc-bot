const { Client, Events, GatewayIntentBits } = require("discord.js");
const { botToken } = require("./config");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(botToken);
