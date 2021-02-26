module.exports = {
    name: 'ping',
    description: 'To Calculate Bot & API ping',
    execute(message, client, MessageEmbed) {
        message.delete()
        message.channel.send(':hourglass: **Menghitung Ping Dalam 5 Detik...**').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp

            setTimeout(function () {
                const embed = new MessageEmbed()
                    .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                    .setColor('#15FF02')
                    .setTitle('**Prefix:** `.`')
                    .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B')
                    .addField('🤖 Bot Latency', ping, true)
                    .addField('🌐 API Latency', client.ws.ping, true)
                    .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
                resultMessage.edit('', embed)
            }, 5000)
        })
    }
}