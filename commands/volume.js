module.exports = {
    name: 'volume',
    description: 'To change the volume',
    async execute(message, args, distube, MessageEmbed, Prefix, wh, Icon) {
        message.delete()
        if (!message.member.roles.cache.has('800297876080033813')) return wh.send(':x: **Kamu Tidak Punya Izin Untuk Mengubah Volume Suara Bot!**', {
            username: 'UniversNetwork Song Player',
            avatarURL: 'https://i.imgur.com/pBmA5S6.png'
        })
        let queue = await distube.getQueue(message)

        if (queue) {
            if (!args[0]) return wh.send('**Salah ketik! Seharusnya: *.volume <angka>***', {
                username: 'UniversNetwork Song Player',
                avatarURL: 'https://i.imgur.com/pBmA5S6.png'
            })

            if (isNaN(args[0])) return wh.send('**Mohon masukkan angka yang benar!**', {
                username: 'UniversNetwork Song Player',
                avatarURL: 'https://i.imgur.com/pBmA5S6.png'
            })

            if (args[0] < 0) return wh.send('**Kamu tidak bisa mengubah volume suara dibawah 0!**', {
                username: 'UniversNetwork Song Player',
                avatarURL: 'https://i.imgur.com/pBmA5S6.png'
            })

            distube.setVolume(message, args[0]).then(wh.send({
                username: 'UniversNetwork Song Player',
                avatarURL: 'https://i.imgur.com/pBmA5S6.png',
                embeds: [new MessageEmbed()
                    .setTitle('**Prefix:** `' + Prefix + '`')
                    .setColor('#FBFF00')
                    .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                    .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B')
                    .addField(':loud_sound: Mengubah Volume Suara Menjadi `' + args[0] + '`', '\u200B')
                    .setFooter('Made By ARVIN3108 ID', Icon)]
            }))

        } else if (!queue) {
            wh.send(':x: **Bot tidak sedang memutar lagu!**', {
                username: 'UniversNetwork Song Player',
                avatarURL: 'https://i.imgur.com/pBmA5S6.png'
            })
        }
    }
}