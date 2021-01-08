module.exports = {
    name: 'join',
    description: 'Joins To Some Voice Channel',
    async execute(message, MessageEmbed) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.delete().then(message.channel.send(':exclamation: **Kamu perlu berada di voice channel sebelum memutar lagu!**'))
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.delete().then(message.channel.send(':x: **Bot tidak punya izin untuk terhubung ke voice channel**'))
        if (!permissions.has('SPEAK')) return message.delete().then(message.channel.send(':x: **Bot tidak punya izin untuk memutar lagu!**'))
        const embed = new MessageEmbed()
            .setColor('#02C2FF')
            .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/63db7674caa58a0694d989693bc4b60a.png?size=64', 'https://minecraft-mp.com/server-s272254')
            .setTitle('**Prefix:** `.`')
            .setDescription(':clipboard: **Diminta Oleh ' + message.author.username + '**\n\u200B\n\u200B')
            .addField('\u200B', '\u200B', true)
            .addField('Song Player', '\u200B', true)
            .addField('\u200B', '\u200B', true)
            .addField(':white_check_mark: **Terhubung Ke Voice Channel**', voiceChannel.name)
            .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
        await voiceChannel.join()
        await message.delete().then(message.channel.send(embed))
    }
}