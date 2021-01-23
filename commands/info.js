module.exports = {
    name: 'info',
    description: 'To get info from bot or server',
    execute(message, args, MessageEmbed, Version, Prefix) {
        const { guild } = message
        const { name, id, region, memberCount, ownerID, createdAt, iconURL } = guild
        if (args[0] === 'server') {
            const embed = new MessageEmbed()
                .setColor('#D800FF')
                .setTitle('**Prefix:** `' + Prefix + '`')
                .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B')
                .addField('\u200B', '\u200B', true)
                .addField('**Server Info**', '\u200B', true)
                .addField('\u200B', '\u200B', true)
                .addField(':receipt: Nama Server', name, true)
                .addField(':id: Server ID', id, true)
                .addField(':busts_in_silhouette: Total Member', memberCount, true)
                .addField(':date: Dibuat Pada Tanggal', createdAt, true)
                .addField(':earth_asia: Server Region', region, true)
                .addField(':crown: Server Owner', '<@' + ownerID + '>', true)
                .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')

            message.delete().then(message.channel.send(embed))
        }

        if (args[0] === 'bot') {
            const embed = new MessageEmbed()
                .setColor('#0080FF')
                .setTitle('**Prefix:** `' + Prefix + '`')
                .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B')
                .setThumbnail('https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64')
                .addField('\u200B', '\u200B', true)
                .addField('**Bot Info**', '\u200B', true)
                .addField('\u200B', '\u200B', true)
                .addField('Versi', Version, true)
                .addField('Dicoding Dengan', 'JavaScript\nhttps://www.javascript.com', true)
                .addField('Dijalankan Dengan', 'NodeJS\nhttps://nodejs.org', true)
                .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')

            message.delete().then(message.channel.send(embed))
        }

        if (!args[0]) {
            const Embed = new MessageEmbed()
                .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                .setColor('#15FF02')
                .setTitle('**Prefix:** `' + Prefix + '`')
                .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B')
                .addField('\u200B', '\u200B', true)
                .addField('List Of Info Commands', '\u200B', true)
                .addField('\u200B', '\u200B', true)
                .addField(`\`${Prefix}info server\``, 'Untuk Melihat Info Server', true)
                .addField(`\`${Prefix}info bot\``, 'Untuk Melihat Info Bot', true)
                .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
            message.delete().then(message.channel.send(Embed))
        }
    }
}