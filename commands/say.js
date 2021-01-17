module.exports = {
    name: 'say',
    description: 'To say the message',
    execute(message, args) {
        if (message.author.id === '700166055326384179') {
            const text = args.join(' ')
            if (!text) return message.delete().then(message.channel.send('**Salah ketik! Seharusnya: *.say <teks>***'))
            message.delete().then(message.channel.send(text))
        } else return
    }
}