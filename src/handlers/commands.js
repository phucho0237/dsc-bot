const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const { botToken, botClientId } = require("../config");

module.exports = (client) => {
    const commands = [];

    const commandsPath = path.join(__dirname, "..", "commands");
    const commandFolders = fs.readdirSync(commandsPath);

    for (const folder of commandFolders) {
        const folderPath = path.join(commandsPath, folder);
        const commandFiles = fs
            .readdirSync(folderPath)
            .filter((file) => file.endsWith(".js"));

        for (const file of commandFiles) {
            const filePath = path.join(folderPath, file);
            const command = require(filePath);

            if ("data" in command && "execute" in command) {
                client.commands.set(command.data.name, command);
                commands.push(command.data.toJSON());
            } else {
                console.log(
                    `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
                );
            }
        }
    }

    const rest = new REST().setToken(botToken);

    (async () => {
        try {
            console.log(
                `Started refreshing ${commands.length} application (/) commands.`,
            );

            const data = await rest.put(
                Routes.applicationCommands(botClientId),
                {
                    body: commands,
                },
            );

            console.log(
                `Successfully reloaded ${data.length} application (/) commands.`,
            );
        } catch (err) {
            console.error(err);
        }
    })();
};
