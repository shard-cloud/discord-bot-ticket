const { Events, ActivityType } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config({ quiet: true });
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { client, mainDB, config } = require("../init.js");
const { logMessage } = require("../utils/mainUtils.js");

module.exports = {
  name: Events.ClientReady,
  async execute() {
    try {
      const rest = new REST({
        version: "10",
      }).setToken(process.env.BOT_TOKEN);
      const commands = Array.from(client.commands.values()).map((command) =>
        command.data.toJSON(),
      );

      (async () => {
        // Validate CLIENT_ID before attempting to register commands
        if (!process.env.CLIENT_ID) {
          console.warn(
            "Warning: CLIENT_ID not set in .env file. Slash commands will not be registered.",
          );
          console.warn(
            "Please set CLIENT_ID in your .env file to enable slash command registration.",
          );
          return;
        }

        try {
          // Determine which route to use based on GUILD_ID
          const useGuildCommands = !!process.env.GUILD_ID;
          const route = useGuildCommands
            ? Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID,
              )
            : Routes.applicationCommands(process.env.CLIENT_ID);

          if (!useGuildCommands) {
            console.log(
              "GUILD_ID not set. Using global commands (may take up to 1 hour to propagate).",
            );
          }

          // Get the previously registered slash commands
          const registeredCommands = await rest.get(route);

          const newCommands = commands.filter((command) => {
            return !registeredCommands.some((registeredCommand) => {
              return registeredCommand.name === command.name;
            });
          });

          const removedCommands = registeredCommands.filter(
            (registeredCommand) => {
              return !commands.some((command) => {
                return command.name === registeredCommand.name;
              });
            },
          );

          // Register the new slash commands if there are any
          if (newCommands.length > 0) {
            await rest.put(route, {
              body: commands,
            });

            console.log("New slash commands registered successfully.");
            console.log(commands.map((command) => command.name));
          } else {
            if (!config.silentStartup) {
              console.log("No new slash commands to register.");
            }
          }

          // Remove the existing slash commands if there are any
          if (removedCommands.length > 0) {
            await Promise.all(
              removedCommands.map((command) =>
                rest.delete(
                  useGuildCommands
                    ? Routes.applicationGuildCommand(
                        process.env.CLIENT_ID,
                        process.env.GUILD_ID,
                        command.id,
                      )
                    : Routes.applicationCommand(
                        process.env.CLIENT_ID,
                        command.id,
                      ),
                ),
              ),
            );

            console.log("Existing slash commands removed successfully.");
            console.log(removedCommands.map((command) => command.name));
          } else {
            if (!config.silentStartup) {
              console.log("No existing slash commands to remove.");
            }
          }
        } catch (error) {
          if (error) {
            error.errorContext = `[Commands Registration Error]: an error occurred during slash command registration`;
            client.emit("error", error);
            
            // Provide specific error messages based on what's missing
            if (!process.env.CLIENT_ID) {
              console.error(
                "Error: CLIENT_ID is not set in your .env file.",
              );
              console.error(
                "Please add CLIENT_ID=<your-bot-client-id> to your .env file.",
              );
            } else if (error.code === 50035 || error.message.includes("undefined")) {
              console.error(
                "Error: Invalid CLIENT_ID or GUILD_ID format.",
              );
              console.error(
                "Please verify that CLIENT_ID and GUILD_ID (if using guild commands) are valid Discord snowflake IDs.",
              );
            } else {
              console.error(
                'If you received an error saying "Unknown Application" then double check your client ID and guild ID in your .env file.',
              );
            }
            
            console.log(
              `The bot may have been invited with some missing options. Please use the link below to re-invite your bot if that is the case.`,
            );
            const clientId = process.env.CLIENT_ID || "YOUR_CLIENT_ID";
            console.log(
              `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=268823632&scope=bot%20applications.commands`,
            );
          }
        }
      })();

      const presence = {
        activities: [
          {
            name: config.status.botActivityText || "Support Tickets",
            type: ActivityType[config.status.botActivityType || "Watching"],
          },
        ],
        status: config.status.botStatus || "online",
      };

      if (config.status.botActivityType === "Streaming") {
        presence.activities[0].url = config.status.streamingOptionURL;
      }

      client.user.setPresence(presence);
      // Delete any possible leftover claim keys
      const keysToDelete = (await mainDB.startsWith("isClaimInProgress")).map(
        ({ id }) => id,
      );
      await Promise.all(
        keysToDelete.map(async (key) => {
          await mainDB.delete(key);
        }),
      );
      // Convert openTickets from an array to a number - from older versions
      const openTickets = (await mainDB.get("openTickets")) ?? 0;
      if (Array.isArray(openTickets)) {
        await mainDB.set("openTickets", openTickets.length);
      }
      const totalCommands = client.commands.size;
      const now = Date.now();
      const startupTime = (now - client.startingTime) / 1000;
      console.log(
        `The ticket bot is now ready! Logged in as ${client.user.tag}. Startup time was ${startupTime.toFixed(2)} seconds. A total of ${totalCommands} commands were registered.`,
      );
      await logMessage(
        `The ticket bot is now ready! Logged in as ${client.user.tag}. Startup time was ${startupTime.toFixed(2)} seconds. A total of ${totalCommands} commands were registered.`,
      );
    } catch (error) {
      error.errorContext = `[Ready Event Error]: an error occurred during initialization`;
      client.emit("error", error);
    }
  },
};
