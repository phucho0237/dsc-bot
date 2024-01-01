const {
   Client,
   GatewayIntentBits,
   Collection,
   Partials,
   ActivityType
} = require("discord.js");

const config = require("./config");

const client = new Client({
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages
   ],
   partials: [Object.keys(Partials)],
   presence: {
      activities: [
         {
            name: "/help",
            type: ActivityType.Playing
         }
      ],
      status: "dnd"
   }
});

client.commands = new Collection();

["events", "commands"].forEach(handler =>
   require(`./handlers/${handler}`)(client)
);

client.login(config.bot.token);
