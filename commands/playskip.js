module.exports = {
    name: 'playskip',
    description: 'Joins, plays a video from youtube, and skip the song',
    execute(message, args, distube, wh) {
        message.delete()
        if (message.member.roles.cache.has('799838913929412640')) {
            const voiceChannel = message.member.voice.channel,
                music = args.join(" ")

            if (!music) return wh.send(':exclamation: **Kamu perlu menyertakan nama atau link video!**', {
                username: 'UniversNetwork Song Player',
                avatarURL: 'https://i.imgur.com/pBmA5S6.png'
            })

            if (!voiceChannel) return wh.send(':exclamation: **Kamu perlu berada di voice channel sebelum memutar lagu!**', {
                username: 'UniversNetwork Song Player',
                avatarURL: 'https://i.imgur.com/pBmA5S6.png'
            })


            distube.playSkip(message, music)
            wh.send(':mag_right: **Mencari** `' + music + '`', {
                username: 'UniversNetwork Song Player',
                avatarURL: 'https://i.imgur.com/pBmA5S6.png'
            })
        } else {
            wh.send('**Kamu tidak punya izin!**', {
                username: 'UniversNetwork Song Player',
                avatarURL: 'https://i.imgur.com/pBmA5S6.png'
            })
        }
    }
}