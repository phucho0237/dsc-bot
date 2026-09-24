const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");

const { botToken } = require("./config");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

["commands", "events"].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

client.login(botToken);
