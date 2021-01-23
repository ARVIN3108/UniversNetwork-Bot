module.exports = {
    name: 'say',
    description: 'To say the message',
    execute(message, args) {
        if (!message.member.roles.cache.has('800299092197769256')) return message.delete().then(message.channel.send(':x: **Kamu Tidak Punya Izin Untuk Mengirim Pesan Sebagai Bot!**'))
        const text = args.join(' ')
        if (!text) return message.delete().then(message.channel.send('**Salah ketik! Seharusnya: *.say <teks>***'))
        message.delete().then(message.channel.send(text))
    }
}