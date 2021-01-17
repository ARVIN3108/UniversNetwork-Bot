module.exports = {
    name: 'autoplay',
    description: 'To toggle autoplay',
    async execute(message, args, distube) {
        let queue = await distube.getQueue(message)
        if (queue) {
            let mode = distube.toggleAutoplay(message);
            message.delete().then(message.channel.send(":track_next: **Mode AutoPlay " + (mode ? "Dihidupkan!" : "Dimatikan!") + '**'))
        } else if (!queue) {
            message.delete().then(message.channel.send(':x: **Bot tidak sedang memutar lagu!**'))
        }
    }
}