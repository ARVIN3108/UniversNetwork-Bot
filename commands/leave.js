module.exports = {
    name: 'leave',
    description: 'stop the bot and leave the channel',
    async execute(message, MessageEmbed, distube, Prefix, wh, Icon) {
        message.delete()
        let voiceChannel = message.member.voice.channel,
            queue = await distube.getQueue(message),
            options = {
                username: 'UniversNetwork Song Player',
                avatarURL: 'https://i.imgur.com/pBmA5S6.png'
            };
        if (!voiceChannel) return wh.send(':exclamation: **Kamu perlu berada di voice channel sebelum menghentikan lagu!**', options);
        if (queue) {
            await distube.stop(message);
        } else if (!queue) return voiceChannel.leave()
        wh.send({
            username: options.username,
            avatarURL: options.avatarURL,
            embeds: [new MessageEmbed()
                .setColor('#FF0000')
                .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                .setTitle('**Prefix:** `' + Prefix + '`')
                .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B')
                .addField('\u200B', '\u200B', true)
                .addField('Song Player', '\u200B', true)
                .addField('\u200B', '\u200B', true)
                .addField(':no_entry: **Meninggalkan Voice Channel**', voiceChannel.name)
                .setFooter('Made By ARVIN3108 ID', Icon)]
        })
    }
}