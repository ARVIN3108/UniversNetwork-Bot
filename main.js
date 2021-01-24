// DisTube example bot, definitions, properties and events details in the Documentation page.
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
    client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }),
    { MessageAttachment, MessageEmbed, GuildChannel } = require('discord.js'),
    path = require('path'),
    DisTube = require('distube'),
    distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true }),
    // { Token, Prefix, Version } = require('./config.json'),
    Token = process.env.Token,
    Prefix = process.env.Prefix,
    Version = process.env.Version
tempvc = require("./tempvc.js");
tempvc(client)
client.on('guildMemberAdd', async (member) => {
    const memberrole = member.guild.roles.cache.find(role => role.id === '761876904465661962'),
        unmuterole = member.guild.roles.cache.find(role => role.id === '799473003443781704')

    if (member.guild.id != '761872006513033238') return

    member.guild.members.cache.get(member.id).roles.add(memberrole)
    member.guild.members.cache.get(member.id).roles.add(unmuterole)

})
client.commands = new Discord.Collection();
// client.events = new Discord.Collection();

// ['command_handler', 'event_handler'].forEach(handler => {
//     require(`./handlers/${handler}`)(client, Discord, distube, DisTube)
// })
function loadCMD() {
    const fs = require('fs'),
        commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
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
        msg.reply('Hai!')
    }

    if (msg.content === "Hello?" || msg.content === "hello?" || msg.content === "hello" || msg.content === "Hello") {
        msg.reply('Hi!')
    }
})

client.on('messageReactionAdd', async (reaction, user) => {
    const channel = '761874840915148840',
        verificationEmoji = '✅',
        verificationRole = reaction.message.guild.roles.cache.find(role => role.id === "761876904465661962"),
        unmuteRole = reaction.message.guild.roles.cache.find(role => role.id === "799473003443781704")

    if (reaction.message.partial) await reaction.message.fetch()
    if (reaction.partial) await reaction.fetch()
    if (user.bot) return
    if (!reaction.message.guild) return

    if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === verificationEmoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(verificationRole)
            await reaction.message.guild.members.cache.get(user.id).roles.add(unmuteRole)
        }
    } else {
        return
    }
})

client.on('message', async message => {
    if (!message.content.startsWith(Prefix) || message.author.bot || message.author.dmChannel) return
    const args = message.content.slice(Prefix.length).split(/ +/),
        command = args.shift().toLowerCase(),
        ch = client.channels.cache.get(message.channel.id),
        webhooks = await ch.fetchWebhooks(),
        wh = webhooks.first()
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
        client.commands.get('play').execute(message, args, distube, wh)
        //        client.commands.get('play').execute(message, args, MessageEmbed, client)
    } else if (command === 'playskip' || command === 'ps') {
        client.commands.get('playskip').execute(message, args, distube, wh)
    } else if (command === 'leave' || command === 'disconnect' || command === 'dc' || command === 'stop') {
        client.commands.get('leave').execute(message, MessageEmbed, distube, Prefix)
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

    } else if (command === 'vote') {
        client.commands.get('vote').execute(message, MessageEmbed, Prefix)
    } else if (command === 'join' || command === 'summon' || command === 'connect') {
        client.commands.get('join').execute(message, MessageEmbed, wh, Prefix)
    } else if (command === 'verification' || command === 'verify') {
        client.commands.get('verification').execute(message, MessageEmbed, client)
    } else if (command === 'reload' || command === 'load') {
        client.commands.get('reload').execute(message, loadCMD)
    } else if (command === 'info') {
        client.commands.get('info').execute(message, args, MessageEmbed, Version, Prefix)
    } else if (command === 'say') {
        client.commands.get('say').execute(message, args)
    } else if (command === 'ping') {
        client.commands.get('ping').execute(message, client, MessageEmbed, Prefix)
    } else if (command === 'help' || command === '?') {
        client.commands.get('help').execute(message, client, MessageEmbed, Prefix)
    } else if (command === 'search') {
        client.commands.get('search').execute(message, args, MessageEmbed, wh, Prefix)
    }
})
const status = (queue) => `**Volume:** \`${queue.volume}%\` **| Repeat:** \`${queue.repeatMode ? queue.repeatMode == 2 ? "Semua Lagu" : "Hanya Lagu Ini" : "Mati"}\`\n**Acak Lagu:** \`${queue.shuffle ? "Hidup" : "Mati"}\` **| Autoplay:** \`${queue.autoplay ? "Hidup" : "Mati"}\``

distube
    .on("playSong", async (message, queue, song) => {
        // message.channel.send(
        //     `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
        // )
        const voiceChannel = message.member.voice.channel,
            ch = client.channels.cache.get(message.channel.id),
            webhooks = await ch.fetchWebhooks(),
            wh = webhooks.first(),
            embed = new MessageEmbed()
                .setColor('#02C2FF')
                .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                .setTitle('**Prefix:** `' + Prefix + '`')
                .setThumbnail('https://yt3.ggpht.com/ytc/AAUvwnhRCS00s226UbsoI2uhe2XFedXEIBw9jaOtstvTo08=s900-c-k-c0x00ffffff-no-rj')
                .setDescription(':clipboard: **Diminta Oleh** <@' + song.user + '>\n\u200B\n\u200B')
                .addField('\u200B', '\u200B', true)
                .addField('**Song Player**', '\u200B', true)
                .addField(':white_check_mark: **Terhubung Ke Voice Channel**', voiceChannel.name)
                .addField(':arrow_forward: Sedang Memutar Lagu', song.name)
                .addField(':stopwatch: Durasi', song.formattedDuration)
                .addField(':movie_camera: Link Video', song.url)
                .addField(':information_source: Status', status(queue))
                .setImage(song.thumbnail)
                .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')

        wh.send({
            username: 'UniversNetwork Song Player',
            avatarURL: 'https://i.imgur.com/pBmA5S6.png',
            embeds: [embed]
        })
    })
    .on("addSong", async (message, queue, song) => {
        // message.channel.send(
        // `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
        const ch = client.channels.cache.get(message.channel.id),
            webhooks = await ch.fetchWebhooks(),
            wh = webhooks.first(),
            embed = new MessageEmbed()
                .setColor('#15FF02')
                .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                .setTitle('**Prefix:** `' + Prefix + '`')
                .setThumbnail('https://yt3.ggpht.com/ytc/AAUvwnhRCS00s226UbsoI2uhe2XFedXEIBw9jaOtstvTo08=s900-c-k-c0x00ffffff-no-rj')
                .setDescription(':clipboard: **Diminta Oleh** <@' + song.user + '>\n\u200B\n\u200B')
                .addField('\u200B', '\u200B', true)
                .addField('**Song Player**', '\u200B', true)
                .addField(':track_next: Menambahkan Lagu', song.name)
                .addField(':stopwatch: Durasi', song.formattedDuration)
                .addField(':movie_camera: Link Video', song.url)
                .setImage(song.thumbnail)
                .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')

        wh.send({
            username: 'UniversNetwork Song Player',
            avatarURL: 'https://i.imgur.com/pBmA5S6.png',
            embeds: [embed]
        })
    })
    .on("playList", async (message, queue, playlist, song) => {
        // message.channel.send(
        //     `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`)
        const voiceChannel = message.member.voice.channel,
            ch = client.channels.cache.get(message.channel.id),
            webhooks = await ch.fetchWebhooks(),
            wh = webhooks.first(),
            embedlist = new MessageEmbed()
                .setColor('#FBFF00')
                .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                .setTitle('**Prefix:** `' + Prefix + '`')
                .setThumbnail('https://yt3.ggpht.com/ytc/AAUvwnhRCS00s226UbsoI2uhe2XFedXEIBw9jaOtstvTo08=s900-c-k-c0x00ffffff-no-rj')
                .setDescription(':clipboard: **Diminta Oleh** <@' + playlist.user + '>\n\u200B\n\u200B')
                .addField('\u200B', '\u200B', true)
                .addField('**Song Player**', '\u200B', true)
                .addField(':white_check_mark: **Terhubung Ke Voice Channel**', voiceChannel.name)
                .addField(':arrow_forward: Sedang Memutar Daftar Lagu', playlist.name)
                .addField(':1234: Jumlah Lagu', playlist.songs.length)
                .addField(':stopwatch: Total Durasi', playlist.formattedDuration)
                .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64'),

            embed = new MessageEmbed()
                .setColor('#02C2FF')
                .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                .setTitle('**Prefix:** `' + Prefix + '`')
                .setThumbnail('https://yt3.ggpht.com/ytc/AAUvwnhRCS00s226UbsoI2uhe2XFedXEIBw9jaOtstvTo08=s900-c-k-c0x00ffffff-no-rj')
                .setDescription(':clipboard: **Diminta Oleh** <@' + song.user + '>\n\u200B\n\u200B')
                .addField('\u200B', '\u200B', true)
                .addField('**Song Player**', '\u200B', true)
                .addField(':white_check_mark: **Terhubung Ke Voice Channel**', voiceChannel.name)
                .addField(':arrow_forward: Sedang Memutar Lagu', song.name)
                .addField(':stopwatch: Durasi', song.formattedDuration)
                .addField(':movie_camera: Link Video', song.url)
                .addField(':information_source: Status', status(queue))
                .setImage(song.thumbnail)
                .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')

        wh.send({
            username: 'UniversNetwork Song Player',
            avatarURL: 'https://i.imgur.com/pBmA5S6.png',
            embeds: [embedlist, embed]
        })
    })
    .on("addList", async (message, queue, playlist) => {
        // message.channel.send(
        //     `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)
        const ch = client.channels.cache.get(message.channel.id),
            webhooks = await ch.fetchWebhooks(),
            wh = webhooks.first(),
            embed = new MessageEmbed()
                .setColor('#15FF02')
                .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                .setTitle('**Prefix:** `' + Prefix + '`')
                .setThumbnail('https://yt3.ggpht.com/ytc/AAUvwnhRCS00s226UbsoI2uhe2XFedXEIBw9jaOtstvTo08=s900-c-k-c0x00ffffff-no-rj')
                .setDescription(':clipboard: **Diminta Oleh** <@' + playlist.user + '>\n\u200B\n\u200B')
                .addField('\u200B', '\u200B', true)
                .addField('**Song Player**', '\u200B', true)
                .addField(':track_next: Menambahkan Daftar Lagu', playlist.name)
                .addField(':1234: Jumlah Lagu', playlist.songs.length)
                .addField(':stopwatch: Total Durasi', playlist.formattedDuration)
                .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')

        wh.send({
            username: 'UniversNetwork Song Player',
            avatarURL: 'https://i.imgur.com/pBmA5S6.png',
            embeds: [embed]
        })
    })
    // DisTubeOptions.searchSongs = true
    .on("searchResult", async (message, result) => {
        let i = 0,
            ch = client.channels.cache.get(message.channel.id),
            webhooks = await ch.fetchWebhooks(),
            wh = webhooks.first()

        wh.send(`**Pilih Salah Satu Lagu Dibawah Ini**\n*Ketik Salah Satu Angka Untuk Memilih*\n\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n\n")}\n\n*Ketik Huruf Apapun Atau Tunggu 1 Menit Untuk Membatalkan*\n\n**Diminta Oleh** ${message.author}`, {
            username: 'UniversNetwork Song Player',
            avatarURL: 'https://i.imgur.com/pBmA5S6.png'
        });
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", async (message) => {
        const ch = client.channels.cache.get(message.channel.id),
            webhooks = await ch.fetchWebhooks(),
            wh = webhooks.first()

        wh.send(':x: **Pencarian Dibatalkan**', {
            username: 'UniversNetwork Song Player',
            avatarURL: 'https://i.imgur.com/pBmA5S6.png'
        })
    })
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    })
    .on('empty', async message => {
        const voiceChannel = message.member.voice.channel,
            webhooks = await ch.fetchWebhooks(),
            wh = webhooks.first(),
            embed = new MessageEmbed()
                .setColor('#FF0000')
                .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
                .setTitle('**Prefix:** `' + Prefix + '`')
                .setDescription(':clipboard: **Diminta Oleh** <@' + message.author + '>\n\u200B\n\u200B')
                .addField('\u200B', '\u200B', true)
                .addField('Song Player', '\u200B', true)
                .addField('\u200B', '\u200B', true)
                .addField(':no_entry: **Meninggalkan Voice Channel**', voiceChannel.name)
                .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')

        await wh.send({
            username: 'UniversNetwork Song Player',
            avatarURL: 'https://i.imgur.com/pBmA5S6.png',
            embeds: [embed]
        })
    })

client.login(Token)