module.exports = {
    name: 'join',
    description: 'Joins To Some Voice Channel',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.delete().then(message.channel.send(':exclamation: **Kamu perlu berada di voice channel sebelum memutar lagu!**'));
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.delete().then(message.channel.send(':x: **Kamu tidak punya izin!**'));
        if (!permissions.has('SPEAK')) return message.delete().then(message.channel.send(':x: **Kamu tidak punya izin!**'));
        await voiceChannel.join().then(message.delete()).then(message.channel.send(':white_check_mark: **Tersambung ke voice channel "**' + voiceChannel.name + '**"**'))
        return
    }
}