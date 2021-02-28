var { get } = require('request-promise-native')
module.exports = {
    name: 'anime',
    description: 'To search anime on kitsu.io',
    async execute(message, args, wh, MessageEmbed, Prefix, Icon) {
        message.delete()
        if (!args.length) return wh.send(':exclamation: **Harap Masukkan Nama Anime Yang Ingin Dicari!**', {
            username: 'UniversNetwork Kitsu Searching System',
            avatarURL: 'https://avatars.githubusercontent.com/u/7648832?s=280&v=4',
        })

        let options = {
            url: `https://kitsu.io/api/edge/anime?filter[text]=${args.join(" ")}`,
            method: `GET`,
            headers: {
                'Content-Type': "application/vnd.api+json",
                'Accept': "application/vnd.api+json"

            },
            json: true
        }
        await wh.send(`:mag_right: **Mencari** \`${args.join(' ')}\``, {
            username: 'UniversNetwork Kitsu Searching System',
            avatarURL: 'https://avatars.githubusercontent.com/u/7648832?s=280&v=4'
        }).then(msg => {
            get(options).then(body => {
                console.log(body.data[0])
                try {
                    wh.send({
                        username: 'UniversNetwork Kitsu Searching System',
                        avatarURL: 'https://avatars.githubusercontent.com/u/7648832?s=280&v=4',
                        embeds: [new MessageEmbed()
                            .setTitle('**Prefix:** `' + Prefix + '`')
                            .setColor('RANDOM')
                            .setThumbnail(body.data[0].attributes.posterImage.original)
                            .setImage(body.data[0].attributes.coverImage.original)
                            .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                            .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B\n\u200B' + `**[${body.data[0].attributes.titles.en_jp}](https://kitsu.io/anime/${body.data[0].id})**\n${body.data[0].attributes.synopsis}`)
                            .addField(':hourglass_flowing_sand: **Status Pembuatan**', body.data[0].attributes.status, true)
                            .addField(':dividers: **Tipe Tayang**', body.data[0].attributes.subtype, true)
                            .addField(':calendar_spiral: **Waktu Tayang**', `Dari **${body.data[0].attributes.startDate}** Hingga **${body.data[0].attributes.endDate}**`)
                            .addField(':minidisc: **Total Episode**', body.data[0].attributes.episodeCount, true)
                            .addField(':star: **Rating Rata-Rata**', `**${body.data[0].attributes.averageRating}/100**`, true)
                            .addField(':busts_in_silhouette: **Jumlah Penonton**', body.data[0].attributes.userCount)
                            .addField(':sparkling_heart: **Jumlah Penonton Favorit**', body.data[0].attributes.favoritesCount)
                            .addField(':trophy: **Peringkat Rating**', `**TOP ${body.data[0].attributes.ratingRank}**`, true)
                            .addField(':trophy: **Peringkat Popularitas**', `**TOP ${body.data[0].attributes.popularityRank}**`, true)
                            .setFooter('Made By ARVIN3108 ID', Icon)]
                    })

                    msg.delete()
                } catch {
                    msg.delete()
                    return wh.send(`:x: **Anime** \`${args.join(' ')}\` **Tidak Dapat Ditemukan!**`, {
                        username: 'UniversNetwork Kitsu Searching System',
                        avatarURL: 'https://avatars.githubusercontent.com/u/7648832?s=280&v=4'
                    })
                }
            })
        })
    }
}