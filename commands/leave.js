module.exports = {
    name: 'leave',
    description: 'stop the bot and leave the channel',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.delete().then(message.channel.send("**Kamu perlu berada di voice channel sebelum menghentikan lagu!**"));
        await voiceChannel.leave();
        await message.delete().then(message.channel.send('**Meninggalkan voice channel** :no_entry:'))
    }
}