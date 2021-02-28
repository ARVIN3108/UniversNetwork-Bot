var Scraper = require('images-scraper'),
    google = new Scraper({
        puppeteer: {
            headless: true
        }
    })
module.exports = {
    name: 'search',
    description: 'Search image from google',
    async execute(message, args, MessageEmbed, wh, Prefix, Icon) {
        message.delete()
        const image_query = args.join(" ")

        if (!image_query) return wh.send(':exclamation: **Kamu perlu menyertakan kalimat yang ingin dicari!**', {
            username: 'UniversNetwork Google Searching System',
            avatarURL: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png'
        })
        await wh.send(`:mag_right: **Mencari** \`${image_query}\``, {
            username: 'UniversNetwork Google Searching System',
            avatarURL: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png'
        }).then(async msg => {
            const image_result = await google.scrape(image_query, 1)
            msg.delete().then(wh.send({
                username: 'UniversNetwork Google Searching System',
                avatarURL: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png',
                embeds: [new MessageEmbed()
                    .setColor('RANDOM')
                    .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                    .setTitle('**Prefix:** `' + Prefix + '`')
                    .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B')
                    .addField('Hasil Pencarian Gambar', `\`${image_query}\``)
                    .setImage(image_result[0].url)
                    .setFooter('Made By ARVIN3108 ID', Icon)]
            }))
        })
    }
}