module.exports = {
    name: 'skip',
    description: 'To skip song',
    async execute(message, args, distube) {
        let queue = await distube.getQueue(message)

        if(queue) {
            distube.skip(message)
    
            message.delete().then(message.channel.send(':track_next: **Melewati Lagu!**'))
        } else if (!queue) {
            message.delete().then(message.channel.send(':x: **Kamu tidak sedang memutar lagu!**'))
        }

    }
}