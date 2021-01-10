module.exports = {
    name: 'vote',
    description: 'This is a vote command',
    execute(message, MessageEmbed) {
        const Embed = new MessageEmbed()
            .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/63db7674caa58a0694d989693bc4b60a.png?size=64', 'https://minecraft-mp.com/server-s272254')
            .setColor('#15FF02')
            .setTitle('**Prefix:** `.`')
            .setDescription(':clipboard: **Diminta Oleh ' + message.author.username + '**\n\u200B\n\u200B')
            .setImage('https://cdn.discordapp.com/attachments/761872007116750852/784062571535794196/standard.gif')
            .addField('\u200B', '\u200B', true)
            .addField('List Of Vote Link', '\u200B', true)
            .addField('\u200B', '\u200B', true)
            .addField('Minecraft-MP', 'https://minecraft-mp.com/server/272254/vote/')
            .addField('MinecraftServers', 'https://minecraftservers.org/vote/600734')
            .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
        message.delete().then(message.channel.send(Embed))
    }
}
