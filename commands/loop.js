module.exports = {
    name: 'loop',
    description: 'To loop song',
    async execute(message, args, distube) {
        let queue = await distube.getQueue(message)
        if (queue) {
            let mode = distube.setRepeatMode(message, parseInt(args[0]));
            mode = mode ? mode == 2 ? "Repeat Semua Lagu" : "Repeat Lagu Ini" : "Mati";
            message.delete().then(message.channel.send(":repeat: **Mode Repeat Saat Ini** `" + mode + "`"))
        } else if (!queue) {
            message.delete().then(message.channel.send(':x: **Bot tidak sedang memutar lagu!**'))
        }
    }
}