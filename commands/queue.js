module.exports = {
    name: 'queue',
    description: 'To view list queue',
    async execute(message, args, distube) {
        let queue = await distube.getQueue(message)
        if (queue) {
            message.delete().then(message.channel.send('**Daftar Lagu Yang Diputar Saat Ini**\n\n' + queue.songs.map((song, id) => `**${id+1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n\n")))
        } else if (!queue) {
            message.delete().then(message.channel.send(':x: **Bot tidak sedang memutar lagu!**'))
        }
    }
}