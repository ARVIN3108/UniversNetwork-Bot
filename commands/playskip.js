module.exports = {
    name: 'playskip',
    description: 'Joins, plays a video from youtube, and skip the song',
    execute(message, args, distube) {
        if (message.member.roles.cache.has('799838913929412640')) {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) return message.delete().then(message.channel.send(':exclamation: **Kamu perlu berada di voice channel sebelum memutar lagu!**'))
        const music = args.join(" ")
        distube.playSkip(message, music)
        message.delete().then(message.channel.send(':mag_right: **Mencari** `' + music + '`'))
    } else {
        message.delete().then(message.channel.send('**Kamu tidak punya izin!**'))
    }}
}