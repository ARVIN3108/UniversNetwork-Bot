module.exports = {
    name: 'skip',
    description: 'To skip song',
    async execute(message, distube, wh, Prefix, MessageEmbed, Icon) {
        message.delete()
        let queue = await distube.getQueue(message)

        if (queue) {
            distube.skip(message).then(wh.send(':track_next: **Melewati Lagu!**', {
                username: 'UniversNetwork Song Player',
                avatarURL: 'https://i.imgur.com/pBmA5S6.png',
                embeds: [new MessageEmbed()
                    .setTitle('**Prefix:** `' + Prefix + '`')
                    .setColor('#FBFF00')
                    .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                    .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B')
                    .addField(':track_next: **Melewati Lagu!**', '\u200B')
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