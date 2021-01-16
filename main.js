// // DisTube example bot, definitions, properties and events details in the Documentation page.
// const Discord = require('discord.js'),
//     DisTube = require('distube'),
//     client = new Discord.Client(),
//     config = {
//         prefix: ".",
//         token: "TOKEN"
//     };

// // Create a new DisTube
// const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });

// client.on('ready', () => {
//     console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on("message", async (message) => {
//     if (message.author.bot) return;
//     if (!message.content.startsWith(config.prefix)) return;
//     const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
//     const command = args.shift();

//     if (command == "play")
//         distube.play(message, args.join(" "));

//     if (["repeat", "loop"].includes(command))
//         distube.setRepeatMode(message, parseInt(args[0]));

//     if (command == "stop") {
//         distube.stop(message);
//         message.channel.send("Stopped the music!");
//     }

//     if (command == "skip")
//         distube.skip(message);

//     if (command == "queue") {
//         let queue = distube.getQueue(message);
//         message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
//             `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
//         ).slice(0, 10).join("\n"));
//     }

//     if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
//         let filter = distube.setFilter(message, command);
//         message.channel.send("Current queue filter: " + (filter || "Off"));
//     }
// });

// // Queue status template
// const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// // DisTube event listeners, more in the documentation page
// distube
//     .on("playSong", (message, queue, song) => message.channel.send(
//         `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
//     ))
//     .on("addSong", (message, queue, song) => message.channel.send(
//         `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
//     ))
//     .on("playList", (message, queue, playlist, song) => message.channel.send(
//         `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
//     ))
//     .on("addList", (message, queue, playlist) => message.channel.send(
//         `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
//     ))
//     // DisTubeOptions.searchSongs = true
//     .on("searchResult", (message, result) => {
//         let i = 0;
//         message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
//     })
//     // DisTubeOptions.searchSongs = true
//     .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
//     .on("error", (message, e) => {
//         console.error(e)
//         message.channel.send("An error encountered: " + e);
//     });

// client.login(config.token);
const Discord = require('discord.js'),
    client = new Discord.Client(),
    // const Canvas = require('canvas')
    { MessageAttachment, MessageEmbed, GuildChannel } = require('discord.js'),
    path = require('path'),
    DisTube = require('distube'),
    // { Token, Prefix, Version } = require('./config.json')
    Token = process.env.Token,
    Prefix = process.env.Prefix,
    Version = process.env.Version

// client.on('guildMemberAdd', async (member) => {
//     const { guild } = member
//     console.log(member)
//     let channel = '761875413223735296'
//     if (member.guild.id != '761872006513033238') return
//     if (!channel) return
//     const canvas = Canvas.createCanvas(555, 260)
//     const ctx = canvas.getContext('2d');

//     const background = await Canvas.loadImage(
//         path.join(__dirname, './background.png')
//     )

//     let x = 0
//     let y = 0
//     ctx.drawImage(background, x, y)

//     const pfp = await Canvas.loadImage(
//         member.user.displayAvatarURL({
//             format: 'png',
//         })
//     )
//     x = canvas.width / 2 - pfp.width / 2
//     y = 25
//     ctx.drawImage(pfp, x, y)

//     ctx.fillStyle = '#ffffff' // White text
//     ctx.font = '35px sans-serif'
//     let text = `Welcome ${member.user.tag}!`
//     x = canvas.width / 2 - ctx.measureText(text).width / 2
//     ctx.fillText(text, x, 60 + pfp.height)

//     // Display member count
//     ctx.font = '30px sans-serif'
//     text = `Member #${guild.memberCount}`
//     x = canvas.width / 2 - ctx.measureText(text).width / 2
//     ctx.fillText(text, x, 100 + pfp.height)

//     const attachment = new MessageAttachment(canvas.toBuffer())
//     client.channels.cache.get(channel).send('', attachment)
// })
function loadCMD() {
    const fs = require('fs'),
        ms = require('ms')
    client.commands = new Discord.Collection
    const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
    for (const file of commandFiles) {
        delete require.cache[require.resolve(`./commands/${file}`)]
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    }
}
loadCMD()
client.once('ready', () => {
    console.log('UniversNetwork Bot is online')

    setInterval(() => {
        const statuses = [
            'Versi ' + Version,
            'Dibuat Oleh ARVIN3108 ID',
            'IP: play.universnetwork.xyz',
            'Selamat Tahun Baru 2021! Dari UniversNetwork!',
            'Cave Block Released'
        ]
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status)
    }, 1000
    )
})

client.on('message', msg => {
    if (msg.content === "Halo?" || msg.content === "halo?" || msg.content === "halo" || msg.content === "Halo") {
        msg.reply('Hai')
    }
})

client.on('message', msg => {
    if (msg.content === "Hello?" || msg.content === "hello?" || msg.content === "hello" || msg.content === "Hello") {
        msg.reply('Hi!')
    }
})

client.on('message', message => {
    if (!message.content.startsWith(Prefix) || message.author.bot) return
    const args = message.content.slice(Prefix.length).split(/ +/),
        command = args.shift().toLowerCase(),
        getChannel = client.channels.cache.get(message.channel.id)

    if (command === 'ip') {
        client.commands.get('ip').execute(message, args)
    } else if (command === 'kick') {
        client.commands.get('kick').execute(message, args)
    } else if (command === 'ban') {
        client.commands.get('ban').execute(message, args)
    } else if (command === 'clear') {
        client.commands.get('clear').execute(message, args)
    } else if (command === 'mute') {
        client.commands.get('mute').execute(message, args)
    } else if (command === 'unmute') {
        client.commands.get('unmute').execute(message, args)
    } else if (command === 'play' || command === 'p') {
        client.commands.get('play').execute(message, args, distube)
        //        client.commands.get('play').execute(message, args, MessageEmbed, client)
    } else if (command === 'playskip' || command === 'ps') {
        client.commands.get('playskip').execute(message, args, distube)
    } else if (command === 'leave' || command === 'disconnect' || command === 'dc' || command === 'stop') {
        client.commands.get('leave').execute(message, MessageEmbed, distube)
    } else if (command === 'skip' || command === 's') {
        client.commands.get('skip').execute(message, args, distube)
    } else if (command === 'loop' || command === 'repeat') {
        client.commands.get('loop').execute(message, args, distube)
    } else if (command === 'shuffle' || command === 'random' || command === 'rm') {
        client.commands.get('shuffle').execute(message, args, distube)
    } else if (command === 'volume' || command === 'vol') {
        client.commands.get('volume').execute(message, args, distube)
    } else if (command === 'autoplay' || command === 'ap') {
        client.commands.get('autoplay').execute(message, args, distube)
    } else if (command === 'queue' || command === 'q') {
        client.commands.get('queue').execute(message, args, distube)
        // } else if (command === 'resume') {
        //     client.commands.get('resume').execute(message, args, distube)
        // } else if (command === 'pause') {
        //     client.commands.get('pause').execute(message, args, distube)
    } else if (command === 'help' || command === '?') {
        client.commands.get('help').execute(message, MessageEmbed)
    } else if (command === 'vote') {
        client.commands.get('vote').execute(message, MessageEmbed)
    } else if (command === 'join' || command === 'summon' || command === 'connect') {
        client.commands.get('join').execute(message, MessageEmbed)
    } else if (command === 'verification' || command === 'verify') {
        client.commands.get('verification').execute(message, MessageEmbed, client)
    } else if (command === 'reload' || command === 'load') {
        client.commands.get('reload').execute(message, loadCMD)
    } else if (command === 'info') {
        client.commands.get('info').execute(message, args, MessageEmbed, Version)
    }
})
const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true })
const status = (queue) => `**Volume:** \`${queue.volume}%\` **| Repeat:** \`${queue.repeatMode ? queue.repeatMode == 2 ? "Semua Lagu" : "Hanya Lagu Ini" : "Mati"}\`\n**Acak Lagu:** \`${queue.shuffle ? "Hidup" : "Mati"}\` **| Autoplay:** \`${queue.autoplay ? "Hidup" : "Mati"}\``

distube
    .on("playSong", (message, queue, song) => {
        // message.channel.send(
        //     `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
        // )
        const voiceChannel = message.member.voice.channel,
            embed = new MessageEmbed()
                .setColor('#02C2FF')
                .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/63db7674caa58a0694d989693bc4b60a.png?size=64', 'https://minecraft-mp.com/server-s272254')
                .setTitle('**Prefix:** `.`')
                .setThumbnail('https://yt3.ggpht.com/ytc/AAUvwnhRCS00s226UbsoI2uhe2XFedXEIBw9jaOtstvTo08=s900-c-k-c0x00ffffff-no-rj')
                .setDescription(':clipboard: **Diminta Oleh ' + message.author.username + '**\n\u200B\n\u200B')
                .addField('\u200B', '\u200B', true)
                .addField('**Song Player**', '\u200B', true)
                .addField(':white_check_mark: **Terhubung Ke Voice Channel**', voiceChannel.name)
                .addField(':arrow_forward: Sedang Memutar Lagu', song.name)
                .addField(':stopwatch: Durasi', song.formattedDuration)
                .addField(':movie_camera: Link Video', song.url)
                .addField(':information_source: Status', status(queue))
                .setImage(song.thumbnail)
                .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
        message.channel.send(embed)
    })
    .on("addSong", (message, queue, song) => {
        // message.channel.send(
        // `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
        const embed = new MessageEmbed()
            .setColor('#15FF02')
            .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/63db7674caa58a0694d989693bc4b60a.png?size=64', 'https://minecraft-mp.com/server-s272254')
            .setTitle('**Prefix:** `.`')
            .setThumbnail('https://yt3.ggpht.com/ytc/AAUvwnhRCS00s226UbsoI2uhe2XFedXEIBw9jaOtstvTo08=s900-c-k-c0x00ffffff-no-rj')
            .setDescription(':clipboard: **Diminta Oleh ' + message.author.username + '**\n\u200B\n\u200B')
            .addField('\u200B', '\u200B', true)
            .addField('**Song Player**', '\u200B', true)
            .addField(':track_next: Menambahkan Lagu', song.name)
            .addField(':stopwatch: Durasi', song.formattedDuration)
            .addField(':movie_camera: Link Video', song.url)
            .setImage(song.thumbnail)
        message.channel.send(embed)
    })
    .on("playList", (message, queue, playlist, song) => {
        // message.channel.send(
        //     `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`)
        const voiceChannel = message.member.voice.channel,
            embedlist = new MessageEmbed()
                .setColor('#FBFF00')
                .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/63db7674caa58a0694d989693bc4b60a.png?size=64', 'https://minecraft-mp.com/server-s272254')
                .setTitle('**Prefix:** `.`')
                .setThumbnail('https://yt3.ggpht.com/ytc/AAUvwnhRCS00s226UbsoI2uhe2XFedXEIBw9jaOtstvTo08=s900-c-k-c0x00ffffff-no-rj')
                .setDescription(':clipboard: **Diminta Oleh ' + message.author.username + '**\n\u200B\n\u200B')
                .addField('\u200B', '\u200B', true)
                .addField('**Song Player**', '\u200B', true)
                .addField(':white_check_mark: **Terhubung Ke Voice Channel**', voiceChannel.name)
                .addField(':arrow_forward: Sedang Memutar Daftar Lagu', playlist.name)
                .addField(':1234: Jumlah Lagu', playlist.songs.length)
                .addField(':stopwatch: Total Durasi', playlist.formattedDuration)
                .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
        message.channel.send(embedlist)

        const embed = new MessageEmbed()
            .setColor('#02C2FF')
            .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/63db7674caa58a0694d989693bc4b60a.png?size=64', 'https://minecraft-mp.com/server-s272254')
            .setTitle('**Prefix:** `.`')
            .setThumbnail('https://yt3.ggpht.com/ytc/AAUvwnhRCS00s226UbsoI2uhe2XFedXEIBw9jaOtstvTo08=s900-c-k-c0x00ffffff-no-rj')
            .setDescription(':clipboard: **Diminta Oleh ' + message.author.username + '**\n\u200B\n\u200B')
            .addField('\u200B', '\u200B', true)
            .addField('**Song Player**', '\u200B', true)
            .addField(':white_check_mark: **Terhubung Ke Voice Channel**', voiceChannel.name)
            .addField(':arrow_forward: Sedang Memutar Lagu', song.name)
            .addField(':stopwatch: Durasi', song.formattedDuration)
            .addField(':movie_camera: Link Video', song.url)
            .addField(':information_source: Status', status(queue))
            .setImage(song.thumbnail)
            .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
        message.channel.send(embed)
    })
    .on("addList", (message, queue, playlist) => {
        // message.channel.send(
        //     `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)
        const embed = new MessageEmbed()
            .setColor('#15FF02')
            .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/63db7674caa58a0694d989693bc4b60a.png?size=64', 'https://minecraft-mp.com/server-s272254')
            .setTitle('**Prefix:** `.`')
            .setThumbnail('https://yt3.ggpht.com/ytc/AAUvwnhRCS00s226UbsoI2uhe2XFedXEIBw9jaOtstvTo08=s900-c-k-c0x00ffffff-no-rj')
            .setDescription(':clipboard: **Diminta Oleh ' + message.author.username + '**\n\u200B\n\u200B')
            .addField('\u200B', '\u200B', true)
            .addField('**Song Player**', '\u200B', true)
            .addField(':track_next: Menambahkan Daftar Lagu', playlist.name)
            .addField(':1234: Jumlah Lagu', playlist.songs.length)
            .addField(':stopwatch: Total Durasi', playlist.formattedDuration)
        message.channel.send(embed)
    })
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Pilih Salah Satu Lagu Dibawah Ini**\n*Ketik Salah Satu Angka Untuk Memilih*\n\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n\n")}\n\n*Ketik Huruf Apapun Atau Tunggu 1 Menit Untuk Membatalkan*\n\n**Diminta Oleh** @${message.author.tag}`);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(':x: **Pencarian Dibatalkan**'))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    })
    .on('empty', async message => {
        const embed = new MessageEmbed()
            .setColor('#FF0000')
            .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/63db7674caa58a0694d989693bc4b60a.png?size=64', 'https://minecraft-mp.com/server-s272254')
            .setTitle('**Prefix:** `.`')
            .setDescription(':clipboard: **Diminta Oleh ' + message.author.username + '**\n\u200B\n\u200B')
            .addField('\u200B', '\u200B', true)
            .addField('Song Player', '\u200B', true)
            .addField('\u200B', '\u200B', true)
            .addField(':no_entry: **Meninggalkan Voice Channel**', voiceChannel.name)
            .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
        await message.channel.send(embed)
    })

client.login(Token)