module.exports = {
    name: 'messageCreate',
    once: false,
    async execute( client,message,) {
      if (
            message.author.bot ||
            !message.guild ||
            message.system ||
            message.webhookId
          )
            return;
      }
}