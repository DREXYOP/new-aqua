const {Routes, REST } = require('discord.js');

export class Loader{
    constructor(client){
        this.client = client;
    }
    loadCommands() {
        const data = [];
        let i = 0;
        const commandsFolder = readdirSync("../commands");
        commandsFolder.forEach((category) => {
          const categories = readdirSync(`../commands/${category}/`).filter(
            (file) => file.endsWith('.js'),
          );
          categories.forEach((command) => {
            const f = require(`../commands/${category}/${command}`);
            const cmd = new f(this, f);
            cmd.category = category;
            cmd.file = f;
            cmd.fileName = f.name;
            this.client.commands.set(cmd.name, cmd);
            if (cmd.aliases && Array.isArray(cmd.aliases)) {
              for (const alias of cmd.aliases) {
                this.aliases.set(alias, cmd);
              }
            }
            if (cmd.slashCommand) {
              data.push({
                name: cmd.name,
                description: cmd.description.content,
                options: cmd.options,
                type: ApplicationCommandType.ChatInput,
              });
              if (cmd.permissions.user.length > 0)
                data.default_member_permissions = cmd.permissions.user
                  ? PermissionsBitField.resolve(cmd.permissions.user).toString()
                  : 0;
              ++i;
            }
            this.logger.event(`Successfully loaded [/] command ${i}.`);
          });
        });
    
        const rest = new REST({ version: '10' }).setToken(
          this.user ? this.token : require('@src/config').token,
        );
    
        rest
          .put(
            Routes.applicationCommands(
              this.user ? this.user.id : require('@src/config').clientId,
            ),
            { body: data },
          )
          .then(() =>
            this.logger.info('Successfully reloaded application (/) commands.'),
          )
          .catch((e) => this.logger.error(e.name, e.message));
      }
    
}