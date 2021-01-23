module.exports = {
    name: 'help',
    description: 'This is a help command',
    async execute(message, client, MessageEmbed, Prefix) {
        const prevEmoji = '⬅️',
            nextEmoji = '➡️',
            embed = new MessageEmbed()
                .setColor('#02C2FF')
                .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                .setTitle('**Prefix:** `' + Prefix + '`')
                .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B')
                .addField('\u200B', '\u200B', true)
                .addField('Member List Of Commands', '\u200B', true)
                .addField('\u200B', '\u200B', true)
                .addField(`\`${Prefix}help\` \`${Prefix}?\``, 'Untuk memunculkan menu ini')
                .addField(`\`${Prefix}ip\``, 'Untuk melihat ip dari server ini')
                .addField(`\`${Prefix}play\` \`${Prefix}p\``, 'Untuk memutar lagu *(sama seperti bot musik pada umumnya)*')
                .addField(`\`${Prefix}loop\` \`${Prefix}repeat\``, 'Untuk mengaktifkan atau menonaktifkan mode repeat lagu *(sama seperti bot musik pada umumnya)*')
                .addField(`\`${Prefix}shuffle\` \`${Prefix}random\` \`${Prefix}rm\``, 'Untuk mengaktifkan atau menonaktifkan mode acak lagu *(sama seperti bot musik pada umumnya)*')
                .addField(`\`${Prefix}autoplay\` \`${Prefix}ap\``, 'Untuk mengaktifkan atau menonaktifkan mode putar lagu otomatis')
                .addField(`\`${Prefix}skip\` \`${Prefix}s\``, 'Untuk melewati lagu yang sedang diputar *(sama seperti bot musik pada umumnya)*')
                .addField(`\`${Prefix}queue\` \`${Prefix}q\``, 'Untuk melihat daftar lagu yang sedang diputar *(sama seperti bot musik pada umumnya)*')
                .addField(`\`${Prefix}join\` \`${Prefix}connect\` \`${Prefix}summon\``, 'Untuk membuat bot masuk ke voice channel *(sama seperti bot musik pada umumnya)*')
                .addField(`\`${Prefix}leave\` \`${Prefix}disconnect\` \`${Prefix}dc\` \`${Prefix}stop\``, 'Untuk menghentikan dan men-disconnect bot setelah memutar lagu')
                .addField(`\`${Prefix}vote\``, 'Untuk mengunjungi link vote server ini')
                .addField(`\`${Prefix}ping`, 'Untuk mengukur ping dari bot dan API')
                .addField(`\`${Prefix}info\``, 'Untuk melihat informasi dari server atau bot\n\u200B\n\u200B')
                .addField('Check The Wiki For English Version', 'https://github.com/ARVIN3108/UniversNetwork/blob/main/README.md\n\u200B')
                .addField('Halaman 1/2', 'Klik Emoji ' + nextEmoji + ' Untuk Pergi Ke Halaman Berikutnya')
                .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64'),

            embeds = new MessageEmbed()
                .setColor('#02C2FF')
                .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                .setTitle('**Prefix:** `' + Prefix + '`')
                .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B')
                .addField('\u200B', '\u200B', true)
                .addField('Admin List Of Commands', '\u200B', true)
                .addField('\u200B', '\u200B', true)
                .addField(`\`${Prefix}kick\``, 'Untuk meng-kick member')
                .addField(`\`${Prefix}ban\``, 'Untuk meng-ban member')
                .addField(`\`${Prefix}mute\``, 'Untuk meng-mute member dengan waktu atau permanen')
                .addField(`\`${Prefix}unmute\``, 'Untuk meng-unmute member')
                .addField(`\`${Prefix}playskip\` \`${Prefix}ps\``, 'Untuk memutar dan melewati lagu secara bersamaan')
                .addField(`\`${Prefix}volume\` \`${Prefix}vol\``, 'Untuk merubah volume suara bot saat memutar lagu')
                .addField(`\`${Prefix}say\``, 'Untuk mengirim pesan sebagai bot')
                .addField(`\`${Prefix}clear\``, 'Untuk menghapus pesan dengan cepat')
                .addField(`\`${Prefix}verification\` \`${Prefix}verify\``, 'Untuk meng-set channel verifikasi (mirip dengan carl bot)\n\u200B\n\u200B')
                .addField('Check The Wiki For English Version', 'https://github.com/ARVIN3108/UniversNetwork/blob/main/README.md\n\u200B')
                .addField('Halaman 2/2', 'Klik Emoji ' + prevEmoji + ' Untuk Pergi Ke Halaman Sebelumnya')
                .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
        let result = await message.channel.send(embed)
        message.delete().then(result.react(nextEmoji))

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (!message.author) return

            if (result) {
                if (reaction.emoji.name === nextEmoji) {
                    await result.reactions.removeAll()
                    await result.react(prevEmoji)
                    await result.edit(embeds)
                }

                if (reaction.emoji.name === prevEmoji) {
                    await result.reactions.removeAll()
                    await result.react(nextEmoji)
                    await result.edit(embed)
                }
            } else return

        })
    }
}