module.exports = {
    name: "avatar",
    description: "To show avatar",
    execute(message, args, MessageEmbed, Icon, Prefix) {
        message.delete()
        const member = message.mentions.users.first() || message.member;

        if (!args[0]) {
            message.channel.send(
                new MessageEmbed()
                    .setColor('RANDOM')
                    .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                    .setTitle('**Prefix:** `' + Prefix + '`')
                    .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B' + `<@${member.id}> Avatar`)
                    .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
                    .setFooter('Made By ARVIN3108 ID', Icon))
        } else {
            if (!message.mentions.users.first()) return message.channel.send(':x: **Nama Yang dimasukkan tidak valid!**')
            message.channel.send(
                new MessageEmbed()
                    .setColor('RANDOM')
                    .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                    .setTitle('**Prefix:** `' + Prefix + '`')
                    .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B' + `<@${member.id}> Avatar`)
                    .setImage(member.displayAvatarURL({ dynamic: true, size: 512 }))
                    .setFooter('Made By ARVIN3108 ID', Icon))
        }

    }
}