const Discord = require('discord.js')
module.exports = {
    name: 'vote',
    description: 'This is a vote command',
    execute(message, args) {
        const Embed = new Discord.MessageEmbed()
        .setAuthor('UniversNetwork','https://minecraft-mp.com/images/favicon/272254.png?ts=1608571284','https://minecraft-mp.com/server-s272254')
        .setColor('#15FF02')
        .setTitle('List Of Vote Link')
        .setDescription('**Prefix:** `.`')
        .addField('Diminta Oleh ' + message.author.username,'\u200B')
        .addField('Minecraft-MP','https://minecraft-mp.com/server/272254/vote/')
        .addField('MinecraftServers','https://minecraftservers.org/vote/600734')
        .setFooter('Made By ARVIN3108 ID','https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
        message.delete().then(message.channel.send(Embed))
    }
}