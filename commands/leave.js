module.exports = {
    name: 'leave',
    description: 'stop the bot and leave the channel',
    async execute(message, MessageEmbed, distube) {
        const voiceChannel = message.member.voice.channel;
        let queue = await distube.getQueue(message)
        if (!voiceChannel) return message.delete().then(message.channel.send(':exclamation: **Kamu perlu berada di voice channel sebelum menghentikan lagu!**'))
        if (queue) {
            await distube.stop(message);
            const embed = new MessageEmbed()
                .setColor('#FF0000')
                .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                .setTitle('**Prefix:** `.`')
                .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B')
                .addField('\u200B', '\u200B', true)
                .addField('Song Player', '\u200B', true)
                .addField('\u200B', '\u200B', true)
                .addField(':no_entry: **Meninggalkan Voice Channel**', voiceChannel.name)
                .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
            await message.delete().then(message.channel.send(embed))
        } else if (!queue) {
            return
        }
    }
}