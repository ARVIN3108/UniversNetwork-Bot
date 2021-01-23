var Scraper = require('images-scraper'),
    google = new Scraper({
        puppeteer: {
            headless: true
        }
    })
module.exports = {
    name: 'search',
    description: 'Search image from google',
    async execute(message, args, MessageEmbed, wh, Prefix) {
        const image_query = args.join(" ")

        if (!image_query) return message.delete()
            .then(wh.send(':exclamation: **Kamu perlu menyertakan kalimat yang ingin dicari!**', {
                username: 'UniversNetwork Google Searching System',
                avatarURL: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png'
            }))
        const image_result = await google.scrape(image_query, 1),
            embed = new MessageEmbed()
                .setColor('RANDOM')
                .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                .setTitle('**Prefix:** `' + Prefix + '`')
                .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B')
                .setImage(image_result[0].url)
                .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')

        message.delete().then(wh.send({
            username: 'UniversNetwork Google Searching System',
            avatarURL: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png',
            embeds: [embed]
        }))
    }
}