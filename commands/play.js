const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: 'play',
    description: 'Joins and plays a video from youtube',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.delete().then(message.channel.send(':exclamation: **Kamu perlu berada di voice channel sebelum memutar lagu!**'));
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.delete().then(message.channel.send(':x: **Kamu tidak punya izin!**'));
        if (!permissions.has('SPEAK')) return message.delete().then(message.channel.send(':x: **Kamu tidak punya izin!**'));
        if (!args.length) return message.delete().then(message.channel.send(':exclamation: **Kamu perlu menyertakan nama atau link video!**'));

        const validURL = (str) => {
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if (!regex.test(str)) {
                return false;
            } else {
                return true;
            }
        }

        if (validURL(args[0])) {

            const connection = await voiceChannel.join();
            const stream = ytdl(args[0], { filter: 'audioonly' });

            connection.play(stream, { seek: 0, volume: 1 })

            await message.delete().then(message.channel.send(`**:arrow_forward: Sedang memainkan *${video.title}***`))

            return
        }


        const connection = await voiceChannel.join();

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;

        }

        const video = await videoFinder(args.join(' '));

        if (video) {
            const stream = ytdl(video.url, { filter: 'audioonly' });
            connection.play(stream, { seek: 0, volume: 1 })


            await message.delete().then(message.channel.send(`**:arrow_forward: Sedang memainkan *${video.title}***`))
        } else {
            message.delete().then(message.channel.send(':x: **Tidak dapat menemukan lagu!**'));
        }
    }
}