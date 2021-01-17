module.exports = {
    name: 'shuffle',
    description: 'To toggle shuffle',
    async execute(message, args, distube) {
        let queue = await distube.getQueue(message)
        if (queue) {
            let mode = distube.shuffle(message);
            message.delete().then(message.channel.send(":twisted_rightwards_arrows: **Mode Acak Lagu " + (mode ? "Dihidupkan!" : "Dimatikan!") + '**'))
        } else if (!queue) {
            message.delete().then(message.channel.send(':x: **Bot tidak sedang memutar lagu!**'))
        }
    }
}