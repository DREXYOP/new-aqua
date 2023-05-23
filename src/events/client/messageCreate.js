const Context = require("../../structures/Context.js");

const {
    CommandInteraction,
    Interaction,
    Collection,
    ChannelType,
    InteractionType,
    PermissionFlagsBits,
} = require('discord.js');
module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client,message) {
        if (
            message.author.bot ||
            !message.guild ||
            message.system ||
            message.webhookId
        ) return;


        if (message.partial) await message.fetch();
        
        

        const ctx = new Context(message);

        const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(mention)) {
            if (message.channel.permissionsFor(client.user).has([PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.ViewChannel])) {
                return await message.reply({ content: `Hey, my prefix for this server is \`${client.prefix}\` Want more info? then do \`${client.prefix}help\`\nStay Safe, Stay Awesome!` }).catch(() => { });
            }
        }

        // const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${client.prefix})\\s*`);
        if (!prefixRegex.test(message.content)) return;
        const [matchedPrefix] = message.content.match(prefixRegex);

        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));

        ctx.setArgs(args);

        if (!command) return;
        client.logger.log("command",`${command.name} used by ${ctx.author.id}`);
        let dm = message.author.dmChannel;
        if (typeof dm === 'undefined') dm = await message.author.createDM();

        if (!message.inGuild() || !message.channel.permissionsFor(message.guild.members.me).has(PermissionFlagsBits.ViewChannel)) return;

        if (!message.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) return await message.author.send({ content: `I don't have **\`SEND_MESSAGES\`** permission in \`${message.guild.name}\`\nchannel: <#${message.channelId}>` }).catch(() => { });

        if (!message.guild.members.me.permissions.has(PermissionFlagsBits.EmbedLinks)) return await message.channel.send({ content: 'I don\'t have **`EMBED_LINKS`** permission.' }).catch(() => { });

        if (command.permissions) {
            if (command.permissions.client) {
                if (!message.guild.members.me.permissions.has(command.permissions.client)) return await message.reply({ content: 'I don\'t have enough permissions to execute command.' });
            }

            if (command.permissions.user) {
                if (!message.member.permissions.has(command.permissions.user)) return await message.reply({ content: 'You don\'t have enough permissions to use command.' });

            }
            if (command.permissions.dev) {
                if (client.config.owners) {
                    const findDev = client.config.owners.find((x) => x === message.author.id);
                    if (!findDev) return;
                }

            }
        }

        if (command.player) {
            if (command.player.voice) {
                if (!message.member.voice.channel) return await message.reply({ content: `You must be connected to a voice channel to use \`${command.name}\` command.` });

                if (!message.guild.members.me.permissions.has(PermissionFlagsBits.Speak)) return await message.reply({ content: `I don't have \`CONNECT\` permissions to execute \`${command.name}\` command.` });

                if (!message.guild.members.me.permissions.has(PermissionFlagsBits.Speak)) return await message.reply({ content: `I don't have \`SPEAK\` permissions to execute \`${command.name}\` command.` });

                if (message.member.voice.channel.type === ChannelType.GuildStageVoice && !message.guild.members.me.permissions.has(PermissionFlagsBits.RequestToSpeak)) return await message.reply({ content: `I don't have \`REQUEST TO SPEAK\` permission to execute \`${command.name}\` command.` });

                if (message.guild.members.me.voice.channel) {
                    if (message.guild.members.me.voice.channelId !== message.member.voice.channelId) return await message.reply({ content: `You are not connected to ${message.guild.members.me.voice.channel} to use \`${command.name}\` command.` });
                }
            }

            if (command.player.active) {
                if (!client.poru.players.get(message.guildId).currentTrack) return await message.reply({ content: 'Nothing is playing right now.' });
            }
        }
        if (command.args) {
            if (!args.length) return await message.reply({ content: `Please provide the required arguments. \`${command.description.examples}\`` });
        }


        try {

            return await command.run(ctx, ctx.args);

        } catch (error) {
            await message.channel.send({ content: 'An unexpected error occured, the developers have been notified!' }).catch(() => { });
            console.error(error);
        }

    }
}