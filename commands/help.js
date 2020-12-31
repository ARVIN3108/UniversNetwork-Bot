const Discord = require('discord.js')
module.exports = {
    name: 'help',
    description: 'This is a help command',
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
        .setColor('#02C2FF')
        .setAuthor('UniversNetwork','https://minecraft-mp.com/images/favicon/272254.png?ts=1608571284','https://minecraft-mp.com/server-s272254')
        .setDescription('**Prefix:** `.`')
        .setTitle('List Of Commands')
        .addField('Diminta Oleh ' + message.author.username,'\u200B')
        .addField('Member List Of Commands','\u200B')
        .addField('`.ip`','Untuk melihat ip dari server ini')
        .addField('`.version` `.ver`','Untuk melihat versi dari bot ini')
        .addField('`.play` `.p`','Untuk memutar lagu *(sama seperti bot musik pada umumnya)*')
        .addField('`.leave` `.disconnect` `.dc`','Untuk menghentikan dan men-disconnect bot setelah memutar lagu')
        .addField('`.vote`','Untuk mengunjungi link vote server ini')
        .addField('\u200B','\u200B')
        .addField('Admin List Of Commands','\u200B')
        .addField('`.kick`','Untuk meng-kick member')
        .addField('`.ban`','Untuk meng-ban member')
        .addField('`.mute`','Untuk meng-mute member dengan waktu atau permanen')
        .addField('`.unmute`','Untuk meng-unmute member')
        .addField('`.clear`','Untuk menghapus pesan dengan cepat')
        .setFooter('Made By ARVIN3108 ID','https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
        message.delete().then(message.channel.send(embed))
    }
}