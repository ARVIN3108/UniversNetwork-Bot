const ms = require('ms')
module.exports = {
    name: 'mute',
    description: 'This is a mute command',
    execute(message, args) {
        const target = message.mentions.users.first()
        if (target) {
            let mainRole = message.guild.roles.cache.find(role => role.id === '793697695294291968')
            let muteRole = message.guild.roles.cache.find(role => role.id === '765808025289490452')
            let memberTarget = message.guild.members.cache.get(target.id)

            if (!args[1]) {
                memberTarget.roles.remove(mainRole.id)
                memberTarget.roles.add(muteRole.id)
                message.delete().then(message.channel.send(`${target} **telah di mute**`))
                return
            }

            memberTarget.roles.remove(mainRole.id)
            memberTarget.roles.add(muteRole.id)
            message.delete().then(message.channel.send(`${target} **telah di mute selama ${ms(ms(args[1]))}**`))

            setTimeout(function () {
                memberTarget.roles.add(mainRole.id)
                memberTarget.roles.remove(muteRole.id)
            }, ms(args[1]))
        } else {
            message.delete().then(message.channel.send('**Member tidak dapat ditemukan!**'))
        }
    }
}