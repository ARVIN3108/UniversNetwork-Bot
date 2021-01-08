module.exports = {
    name: 'help',
    description: 'This is a help command',
    execute(message, MessageEmbed) {
        const embed = new MessageEmbed()
            .setColor('#02C2FF')
            .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/63db7674caa58a0694d989693bc4b60a.png?size=64', 'https://minecraft-mp.com/server-s272254')
            .setTitle('**Prefix:** `.`')
            .setDescription(':clipboard: **Diminta Oleh ' + message.author.username + '**\n\u200B\n\u200B')
            .addField('\u200B', '\u200B', true)
            .addField('Member List Of Commands', '\u200B', true)
            .addField('\u200B', '\u200B', true)
            .addField('`.help` `.?`', 'Untuk memunculkan menu ini')
            .addField('`.ip`', 'Untuk melihat ip dari server ini')
            .addField('`.play` `.p`', 'Untuk memutar lagu *(sama seperti bot musik pada umumnya)*')
            .addField('`.join` `.connect` `.summon`', 'Untuk membuat bot masuk ke voice channel *(sama seperti bot musik pada umumnya)*')
            .addField('`.leave` `.disconnect` `.dc`', 'Untuk menghentikan dan men-disconnect bot setelah memutar lagu')
            .addField('`.vote`', 'Untuk mengunjungi link vote server ini')
            .addField('`.info`', 'Untuk melihat informasi dari server atau bot\n\u200B\n\u200B')
            .addField('\u200B', '\u200B',true)
            .addField('Admin List Of Commands', '\u200B',true)
            .addField('\u200B', '\u200B', true)
            .addField('`.kick`', 'Untuk meng-kick member')
            .addField('`.ban`', 'Untuk meng-ban member')
            .addField('`.mute`', 'Untuk meng-mute member dengan waktu atau permanen')
            .addField('`.unmute`', 'Untuk meng-unmute member')
            .addField('`.clear`', 'Untuk menghapus pesan dengan cepat')
            .addField('`.verification` `.verify`', 'Untuk meng-set channel verifikasi (mirip dengan carl bot)')
            .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
        message.delete().then(message.channel.send(embed))
    }
}