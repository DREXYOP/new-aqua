const Context = require('../../structures/Context.js');
const Command = require('../../structures/Command.js');
const {
  CommandInteractionOptionResolver,
  ApplicationCommandOptionType,
  EmbedBuilder
} = require('discord.js');

module.exports = class Play extends Command {
  constructor(client) {
    super(client, {
      name: 'play',
      description: {
        content: 'Plays audio from any supported source.',
        usage: '<song URL or name>',
        examples: ['play alone'],
      },
      aliases: ['p'],
      category: 'Music',
      cooldown: 3,
      player: {
        voice: true,
        dj: false,
        active: false,
        djPerm: null,
      },
      permissions: {
        dev: false,
        client: ['SendMessages', 'ViewChannels', 'EmbedLinks', 'Connect'],
        user: ['SendMessages'],
        voteRequired: false,
      },
      slashCommand: true,
      options: [
        {
          name: 'query',
          description: 'Song name or URL to play.',
          required: true,
          type: ApplicationCommandOptionType.String,
          autocomplete: true,
        },
      ],
    });
  }

  /**
   *
   * @param {Context} ctx
   * @param {string[] | CommandInteractionOptionResolver} args
   */
  async run(ctx, args) {
    if (ctx.isInteraction) {
      await ctx.sendDeferMessage();
      await ctx.deleteMessage();
    }
    if (!args.length)
      return await ctx.channel.send({
        embeds: [
          this.client.embed()
            .setDescription('Please provide an URL or search query'),
        ],
      });

    /**
     * @type {string}
     */
    const query = args.length > 1 ? args.join(' ') : args[0];
    const isURL = this.checkURL(query);
    const client = this.client;
    const node = ctx.client.shoukaku.getNode();

    const MusicDispatcher = client.queue.get(ctx.guild.id);

    let SearchQuery = query;

    if (isURL) {
      const result = await node.rest.resolve(SearchQuery);
      if (!result || !result.tracks.length)
        return ctx.sendMessage({ embeds: [this.client.embed().setDescription('Couldn\'t find Anything in the Given SearchQuery')], allowedMentions: { repliedUser: false } });
      const { type, tracks, playlistName } = result;
      const track = tracks.shift();
      track.info.requester = ctx.author;
      const isPlaylist = type === 'PLAYLIST';
      const res = await client.queue.handle(ctx.guild, ctx.member, ctx.channel, node, track);

      if (isPlaylist) {
        for (const track of tracks) {
          track.info.requester = ctx.author
          if (track.info.title.length > 64) track.info.title = `${track.info.title.split('[').join('[').split(']').join(']').substr(0, 64)}…`;
          await client.queue.handle(ctx.guild, ctx.member, ctx.channel, node, track);
        }
      }
      if (MusicDispatcher)
        await ctx.sendMessage(isPlaylist ?
          {
            embeds: [client.embed()
              .setDescription(`Loaded **${tracks.length}** tracks from: \`${playlistName}\``)], allowedMentions: { repliedUser: false }
          }
          :
          {
            embeds: [client.embed()
              .setDescription(`Queued ${track.info.isStream ? '[StreamingLive]\n' : ''}[${track.info.title}](${track.info.uri}) [${track.info.requester}]`)], allowedMentions: { repliedUser: false }
          }
        ).catch(() => null);
      res?.play();
      return;
    }
    const searchData = await node.rest.resolve(SearchQuery, 'youtube');
    if (!searchData || !searchData.tracks.length)
      return ctx.sendMessage({ embeds: [client.embed().setDescription('Couldn\'t find Anything in the Given SearchQuery')], allowedMentions: { repliedUser: false } });
    const track = searchData.tracks.shift();
    track.info.requester = ctx.author;
    const res = await client.queue.handle(ctx.guild, ctx.member, ctx.channel, node, track);
    if (track.info.title.length > 64) track.info.title = `${track.info.title.split('[').join('[').split(']').join(']').substr(0, 64)}...`;
    if (MusicDispatcher)
    ctx.sendMessage({
        embeds: [client.embed()
          .setDescription(`Queued [${track.info.title}](${track.info.uri}) [${track.info.requester}]`)], allowedMentions: { repliedUser: false }
      }).catch(() => null);
    res?.play();
  } catch(error) {
    ctx.sendMessage(`${error.message}`);
  }



checkURL(string) {
  try {
    new URL(string);
    return true;
  } catch (error) {
    return false;
  }
}
};