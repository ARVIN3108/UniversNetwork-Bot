module.exports = {
    name: 'volume',
    description: 'To change the volume',
    async execute(message, args, distube) {
        if (!message.member.roles.cache.has('800297876080033813')) return message.delete().then(message.channel.send(':x: **Kamu Tidak Punya Izin Untuk Mengubah Volume Suara Bot!**'))
        let queue = await distube.getQueue(message)

        if (queue) {
            if (!args[0]) return message.delete().then(message.channel.send('**Salah ketik! Seharusnya: *.volume <angka>***'))
            if (isNaN(args[0])) return message.delete().then(message.channel.send('**Mohon masukkan angka yang benar!**'))
            if (args[0] < 1) return message.delete().then(message.channel.send('**Kamu tidak bisa mengubah volume suara dibawah 1!**'))
            distube.setVolume(message, args[0])
            message.delete().then(message.channel.send(':loud_sound: **Mengubah Volume Suara Menjadi** `' + args[0] + '%`'))
        } else if (!queue) {
            message.delete().then(message.channel.send(':x: **Bot tidak sedang memutar lagu!**'))
        }
    }
}