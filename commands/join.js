module.exports = {
    name: 'join',
    description: 'Joins To Some Voice Channel',
    async execute(message, MessageEmbed, wh) {
        const voiceChannel = message.member.voice.channel,
            permissions = voiceChannel.permissionsFor(message.client.user);
        if (!voiceChannel) return message.delete()
            .then(wh.send(':exclamation: **Kamu perlu berada di voice channel sebelum memutar lagu!**', {
                username: 'UniversNetwork Song Player',
                avatarURL: 'https://i.imgur.com/pBmA5S6.png'
            }))
        if (!permissions.has('CONNECT')) return message.delete()
            .then(wh.send(':x: **Bot tidak punya izin untuk terhubung ke voice channel**', {
                username: 'UniversNetwork Song Player',
                avatarURL: 'https://i.imgur.com/pBmA5S6.png'
            }))
        if (!permissions.has('SPEAK')) return message.delete()
            .then(wh.send(':x: **Bot tidak punya izin untuk terhubung ke voice channel**', {
                username: 'UniversNetwork Song Player',
                avatarURL: 'https://i.imgur.com/pBmA5S6.png'
            }))
        const embed = new MessageEmbed()
            .setColor('#02C2FF')
            .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
            .setTitle('**Prefix:** `.`')
            .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B')
            .addField('\u200B', '\u200B', true)
            .addField('Song Player', '\u200B', true)
            .addField('\u200B', '\u200B', true)
            .addField(':white_check_mark: **Terhubung Ke Voice Channel**', voiceChannel.name)
            .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
        await voiceChannel.join()
        await message.delete().then(wh.send({
            username: 'UniversNetwork Song Player',
            avatarURL: 'https://i.imgur.com/pBmA5S6.png',
            embeds: [embed]
        }))
    }
}