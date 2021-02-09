const { status, statusBedrock } = require('minecraft-server-util')
module.exports = {
    name: 'minecraft',
    description: 'To Count A Minecraft Server',
    execute(message, args, wh, Prefix, MessageEmbed, command) {
        message.delete()
        const type = args[0],
            ip = args[1];

        if (!type) return wh.send({
            username: 'UniversNetwork Minecraft Server Detector',
            avatarURL: 'https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/minecraft-creeper-face.jpg',
            embeds: [new MessageEmbed()
                .setTitle('**Prefix:** `' + Prefix + '`')
                .setColor('YELLOW')
                .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B')
                .addField('\u200B', '\u200B', true)
                .addField('List Of Minecraft Commands', '\u200B', true)
                .addField('\u200B', '\u200B', true)
                .addField(`\`${Prefix}${command} java <ip> [port]\``, 'Untuk Mencari Minecraft Server Java', true)
                .addField('\u200B', '\u200B', true)
                .addField(`\`${Prefix}${command} bedrock <ip> [port]\``, 'Untuk Mencari Minecraft Server Bedrock', true)
                .addField('\u200B\n:memo: Catatan', '**Jika kata berkurung `<>`**\nMaka sifatnya wajib di isi!\n\n**Jika kata berkurung `[]`**\nMaka sifatnya tidak harus di isi!')
                .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
            ]
        })

        if (!ip) return wh.send(':exclamation: **Mohon masukkan ip mineraft server yang benar!**', {
            username: 'UniversNetwork Minecraft Server Detector',
            avatarURL: 'https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/minecraft-creeper-face.jpg'
        })
        if (type === 'java') {
            const port = args[2] || 25565;
            status(ip, { port: parseInt(port) }).then(result => {
                wh.send({
                    username: 'UniversNetwork Minecraft Server Detector',
                    avatarURL: 'https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/minecraft-creeper-face.jpg',
                    embeds: [new MessageEmbed()
                        .setTitle('**Prefix:** `' + Prefix + '`')
                        .setColor('GREEN')
                        .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                        .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B')
                        .setThumbnail()
                        .setImage()
                        .addField('IP', ip, true)
                        .addField('\u200B', '\u200B', true)
                        .addField('Port', port, true)
                        .addField('Player Online/Max Player', `${result.onlinePlayers}/${result.maxPlayers}`, true)
                        .addField('\u200B', '\u200B', true)
                        .addField('Versi Server', result.version, true)
                        .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
                    ]
                })
            })
                .catch(error => {
                    wh.send(':x: **Server tidak dapat ditemukan!**', {
                        username: 'UniversNetwork Minecraft Server Detector',
                        avatarURL: 'https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/minecraft-creeper-face.jpg'
                    });
                    throw error;
                })
        }

        if (type === 'bedrock') {
            const port = args[2] || 19132;
            statusBedrock(ip, { port: parseInt(port) }).then(result => {
                wh.send({
                    username: 'UniversNetwork Minecraft Server Detector',
                    avatarURL: 'https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/minecraft-creeper-face.jpg',
                    embeds: [new MessageEmbed()
                        .setTitle('**Prefix:** `' + Prefix + '`')
                        .setColor('GREEN')
                        .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                        .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B')
                        .setThumbnail()
                        .setImage()
                        .addField('IP', ip, true)
                        .addField('\u200B', '\u200B', true)
                        .addField('Port', port, true)
                        .addField('Player Online/Max Player', `${result.onlinePlayers}/${result.maxPlayers}`, true)
                        .addField('\u200B', '\u200B', true)
                        .addField('Versi Server', result.version || 'Lastest', true)
                        .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
                    ]
                })
            })
                .catch(error => {
                    wh.send(':x: **Server tidak dapat ditemukan!**', {
                        username: 'UniversNetwork Minecraft Server Detector',
                        avatarURL: 'https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/minecraft-creeper-face.jpg'
                    });
                    throw error;
                })
        }
    }
}