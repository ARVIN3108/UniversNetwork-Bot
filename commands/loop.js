module.exports = {
    name: 'loop',
    description: 'To loop song',
    async execute(message, args, distube, wh, Prefix, MessageEmbed, Icon) {
        message.delete()
        let queue = await distube.getQueue(message)
        if (queue) {
            let mode = distube.setRepeatMode(message, parseInt(args[0]));
            mode = mode ? mode == 2 ? "Repeat Semua Lagu" : "Repeat Lagu Ini" : "Mati";
            wh.send({
                username: 'UniversNetwork Song Player',
                avatarURL: 'https://i.imgur.com/pBmA5S6.png',
                embeds: [new MessageEmbed()
                    .setTitle('**Prefix:** `' + Prefix + '`')
                    .setColor('#02C2FF')
                    .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                    .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B')
                    .addField(":repeat: **Mode Repeat Saat Ini** `" + mode + "`", '\u200B')
                    .setFooter('Made By ARVIN3108 ID', Icon)]
            })
        } else if (!queue) {
            wh.send(':x: **Bot tidak sedang memutar lagu!**', {
                username: 'UniversNetwork Song Player',
                avatarURL: 'https://i.imgur.com/pBmA5S6.png'
            })
        }
    }
}