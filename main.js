const Discord = require('discord.js'),
    { MessageAttachment, MessageEmbed, GuildChannel, Client } = require('discord.js'),
    client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }),
    DisTube = require('distube'),
    distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true }),
    Canvas = require('canvas'),
    mongoose = require('mongoose'),
    { confirmation } = require('@reconlx/discord.js'),
    db = require('quick.db'),
//     { Token, Prefix, Version, embedURL, MongoDB } = require('./config.json'),
    Token = process.env.Token,
    Prefix = process.env.Prefix,
    Version = process.env.Version,
    MongoDB = process.env.MongoDB,
    tempvc = require("./module/tempvc.js"),
    login = require('./module/login.js');
    tempvc(client)

mongoose.connect(MongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(console.log('Connected To MongoDB'))

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
    console.log(client.user.username + ' Bot is online')

    setInterval(() => {
        const statuses = [
            'Versi ' + Version,
            'Dibuat Oleh ARVIN3108 ID',
            'IP: play.universnetwork.xyz',
            'Web: universnetwork.xyz',
            'OneBlock Coming Soon'
        ]
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status)
    }, 1000)
})
    .on('guildMemberAdd', async (member) => {
        const memberrole = member.guild.roles.cache.find(role => role.id === '761876904465661962'),
            unmuterole = member.guild.roles.cache.find(role => role.id === '799473003443781704'),
            botrole = member.guild.roles.cache.find(role => role.id === '761878314271899668');

        if (member.guild.id != '761872006513033238') return;
        if (member.user.bot) return member.guild.members.cache.get(member.id).roles.add(botrole);

        member.guild.members.cache.get(member.id).roles.add(memberrole);
        member.guild.members.cache.get(member.id).roles.add(unmuterole);

    })
    .on('message', msg => {
        if (msg.author.bot) return;

        if (msg.content === "Halo?" || msg.content === "halo?" || msg.content === "halo" || msg.content === "Halo") {
            msg.reply('Hai!');
        };

        if (msg.content === "Hello?" || msg.content === "hello?" || msg.content === "hello" || msg.content === "Hello") {
            msg.reply('Hi!');
        };
    })

    // .on('messageReactionAdd', async (reaction, user) => {
    //     const mainchannel = '804318335978045460',
    //         ticketemoji = '📩',
    //         ticketEmbed = new MessageEmbed()
    //             .setColor('RANDOM')
    //             .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
    //             .setTitle('Pesan akan segera dibalas oleh staff.')
    //             .setDescription('Klik emoji :lock: untuk menutup tiket.')
    //             .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')

    //     if (reaction.message.partial) await reaction.message.fetch()
    //     if (reaction.partial) await reaction.fetch()
    //     if (user.bot) return
    //     if (!reaction.message.guild) return

    //     if (reaction.message.channel.id === mainchannel) {
    //         if (reaction.emoji.name === ticketemoji) {
    //             reaction.message.guild.channels.create(`📜┊${reaction.message.author.username}`, {
    //                 type: 'text',
    //                 parent: '804303922952273930',
    //                 permissionOverwrites: [
    //                     {
    //                         id: reaction.message.guild.id,
    //                         deny: ['VIEW_CHANNEL']
    //                     },
    //                     {
    //                         id: user.id,
    //                         allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS']
    //                     },
    //                     {
    //                         id: '761876701743284234',
    //                         allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS']
    //                     }
    //                 ]
    //             }).then(channel => {
    //                 channel.send(`<@${user.id}>, Selamat Datang Di Tiketmu!`, ticketEmbed).then(resultMessage => {
    //                     resultMessage.react('🔒')
    //                     channel.createWebhook('UniversNetwork')
    //                     db.set('msg.id', resultMessage.id)
    //                     db.set('ticket.user.id', user.id)
    //                     db.set('ticket.user.name', user.username)
    //                     db.set('lock-wait', 'true')
    //                     db.set('ticket.id', channel.id, { user: user.id })
    //                 })
    //             })

    //             reaction.message.guild.channels.create(`📜┊${reaction.message.author.username}┊📑`, {
    //                 type: 'text',
    //                 parent: '804916168087306250',
    //                 permissionOverwrites: [
    //                     {
    //                         id: reaction.message.guild.id,
    //                         deny: ['VIEW_CHANNEL']
    //                     },
    //                     {
    //                         id: '761876701743284234',
    //                         allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS']
    //                     }
    //                 ]
    //             }).then(channel => {
    //                 db.set('transcript.id', channel.id, { user: user.id })
    //                 channel.createWebhook('UniversNetwork')
    //             })
    //         }
    //     }
    //     const lockMessage = db.get('msg.id'),
    //         name = db.get('ticket.user.name')
    //     if (reaction.message.id === lockMessage) {
    //         const id = db.get('ticket.user.id')

    //         if (reaction.emoji.name === '🔒') {
    //             const lock_quest = db.get('lock-wait')
    //             if (lock_quest === 'true') {
    //                 const embed = new MessageEmbed()
    //                     .setColor('RANDOM')
    //                     .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
    //                     .setTitle('Apakah kamu yakin untuk menutup tiket?')
    //                     .setDescription('Klik emoji :x: untuk membatalkan.\n\nKlik emoji :white_check_mark: untuk menutup tiket.')
    //                     .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')

    //                 reaction.message.reactions.removeAll()
    //                 reaction.message.edit(embed)
    //                 reaction.message.react('❌')
    //                 reaction.message.react('✅')
    //                 db.delete('lock-wait')
    //                 db.set('lock', 'true')
    //             }
    //         }

    //         if (reaction.emoji.name === '❌') {
    //             const lock_quest = db.get('lock'),
    //                 unlock_quest = db.get('unlock.ticket'),
    //                 delete_ticket = db.get('delete.ticket');

    //             if (lock_quest === 'true') {
    //                 reaction.message.reactions.removeAll()
    //                 reaction.message.edit(ticketEmbed)
    //                 reaction.message.react('🔒')
    //                 db.delete('lock')
    //             }

    //             if (unlock_quest === 'true') {
    //                 const embed = new MessageEmbed()
    //                     .setColor('RANDOM')
    //                     .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
    //                     .setTitle('Tiket telah Ditutup.')
    //                     .setDescription('Klik emoji :unlock: untuk membuka kembali tiket.\n\nKlik emoji :no_entry: untuk tiket.')
    //                     .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
    //                 reaction.message.reactions.removeAll()
    //                 reaction.message.react('🔓')
    //                 reaction.message.react('⛔')
    //                 reaction.message.edit(embed)
    //                 db.delete('unlock.ticket')
    //                 db.set('unlock-delete', 'true')
    //             }

    //             if (delete_quest === 'true') {
    //                 const embed = new MessageEmbed()
    //                     .setColor('RANDOM')
    //                     .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
    //                     .setTitle('Apakah kamu yakin untuk menghapus tiket?')
    //                     .setDescription('Klik emoji :x: untuk membatalkan.\n\nKlik emoji :white_check_mark: untuk menghapus tiket.')
    //                     .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
    //                 reaction.message.reactions.removeAll()
    //                 reaction.message.react('🔓')
    //                 reaction.message.react('⛔')
    //                 reaction.message.edit(embed)
    //                 db.delete('delete.ticket')
    //                 db.set('unlock-delete', 'true')

    //             }
    //         }

    //         if (reaction.emoji.name === '✅') {
    //             const lock_quest = db.get('lock'),
    //                 unlock_quest = db.get('unlock.ticket'),
    //                 delete_ticket = db.get('delete.ticket')

    //             if (lock_quest === 'true') {
    //                 const embed = new MessageEmbed()
    //                     .setColor('RANDOM')
    //                     .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
    //                     .setTitle('Tiket telah Ditutup.')
    //                     .setDescription('Klik emoji :unlock: untuk membuka kembali tiket.\n\nKlik emoji :no_entry: untuk menghapus tiket.')
    //                     .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')

    //                 reaction.message.reactions.removeAll()
    //                 reaction.message.channel.updateOverwrite(id, { 'VIEW_CHANNEL': false })
    //                 reaction.message.react('🔓')
    //                 reaction.message.react('⛔')
    //                 reaction.message.edit(embed)
    //                 db.delete('lock')
    //                 db.set('unlock-delete', 'true')
    //             }

    //             if (unlock_quest === 'true') {
    //                 reaction.message.reactions.removeAll()
    //                 reaction.message.channel.updateOverwrite(id, { 'VIEW_CHANNEL': true })
    //                 reaction.message.react('🔒')
    //                 reaction.message.edit(ticketEmbed)
    //                 db.delete('unlock.ticket')
    //                 db.set('lock-wait', 'true')
    //             }

    //             if (delete_ticket === 'true') {
    //                 const embed = new MessageEmbed()
    //                     .setColor('RANDOM')
    //                     .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
    //                     .setTitle('Tiket akan dihapus dalam 5 detik.')
    //                     .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
    //                 reaction.message.reactions.removeAll()
    //                 reaction.message.edit(embed);

    //                 setTimeout(function () {
    //                     reaction.message.channel.delete()
    //                 }, 5000)
    //             }
    //         }

    //         if (reaction.emoji.name === '🔓') {
    //             const unlock_quest = db.get('unlock-delete')
    //             if (unlock_quest === 'true') {
    //                 const embed = new MessageEmbed()
    //                     .setColor('RANDOM')
    //                     .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
    //                     .setTitle('Apakah kamu yakin untuk membuka tiket?')
    //                     .setDescription('Klik emoji :x: untuk membatalkan.\n\nKlik emoji :white_check_mark: untuk membuka tiket.')
    //                     .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')

    //                 reaction.message.reactions.removeAll()
    //                 reaction.message.edit(embed)
    //                 reaction.message.react('❌')
    //                 reaction.message.react('✅')
    //                 db.delete('unlock-delete')
    //                 db.set('unlock.ticket', 'true')
    //             }
    //         }

    //         if (reaction.emoji.name === '⛔') {
    //             const unlock_quest = db.get('unlock.ticket'),
    //                 embed = new MessageEmbed()
    //                     .setColor('RANDOM')
    //                     .setAuthor('UniversNetwork', 'https://cdn.discordapp.com/app-icons/792994169659981846/eccf642340521c532b0ade8f00591114.png?size=64', 'https://minecraft-mp.com/server-s272254')
    //                     .setTitle('Apakah kamu yakin untuk menghapus tiket?')
    //                     .setDescription('Klik emoji :x: untuk membatalkan.\n\nKlik emoji :white_check_mark: untuk menghapus tiket.')
    //                     .setFooter('Made By ARVIN3108 ID', 'https://cdn.discordapp.com/avatars/700166055326384179/3ec8287199dc402fe6a587902e300749.png?size=64')
    //             if (unlock_quest === 'true') {
    //                 reaction.message.reactions.removeAll()
    //                 reaction.message.edit(embed)
    //                 reaction.message.react('❌')
    //                 reaction.message.react('✅')
    //                 db.delete('unlock-quest')
    //                 db.set('delete.ticket', 'true')
    //             }
    //         }
    //     } else return
    // })

    // .on('message', async message => {
    //     const channel = db.get('ticket.id')
    //     if (message.channel.id === channel) {
    //         const id = db.get('transcript.id'),
    //             ch = client.channels.cache.get(id),
    //             webhooks = await ch.fetchWebhooks(),
    //             wh = webhooks.first()
    //         wh.send(message.content, {
    //             username: message.author.tag,
    //             avatarURL: message.author.displayAvatarURL({ dynamic: true })
    //         })
    //     }
    // })

    .on('message', async message => {
        if (!message.content.startsWith(Prefix) || message.author.bot || message.author.dmChannel) return
        const args = message.content.slice(Prefix.length).split(/ +/),
            command = args.shift().toLowerCase(),
            ch = client.channels.cache.get(message.channel.id),
            webhooks = await ch.fetchWebhooks(),
            wh = webhooks.first();
        if (command === 'ip') {
            client.commands.get('ip').execute(message, args)
        } else if (command === 'website' || command === 'web') {
            client.commands.get('website').execute(message)
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
            client.commands.get('leave').execute(message, MessageEmbed, distube, Prefix, wh)
        } else if (command === 'skip' || command === 's') {
            client.commands.get('skip').execute(message, args, distube, wh, Prefix, MessageEmbed)
        } else if (command === 'loop' || command === 'repeat') {
            client.commands.get('loop').execute(message, args, distube, wh, Prefix, MessageEmbed)
        } else if (command === 'shuffle' || command === 'random' || command === 'rm') {
            client.commands.get('shuffle').execute(message, distube, MessageEmbed, wh, Prefix)
        } else if (command === 'volume' || command === 'vol') {
            client.commands.get('volume').execute(message, args, distube, MessageEmbed, Prefix, wh)
        } else if (command === 'autoplay' || command === 'ap') {
            client.commands.get('autoplay').execute(message, distube, MessageEmbed, Prefix, wh)
        } else if (command === 'queue' || command === 'q') {
            client.commands.get('queue').execute(message, distube, wh)
            // } else if (command === 'resume') {
            //     client.commands.get('resume').execute(message, args, distube)
            // } else if (command === 'pause') {
            //     client.commands.get('pause').execute(message, args, distube)

        } else if (command === 'vote') {
            client.commands.get('vote').execute(message, MessageEmbed, Prefix)
        } else if (command === 'join' || command === 'summon' || command === 'connect') {
            client.commands.get('join').execute(message, MessageEmbed, wh, Prefix)
            // } else if (command === 'verification' || command === 'verify') {
            //     client.commands.get('verification').execute(message, MessageEmbed, client)
        } else if (command === 'reload' || command === 'load') {
            client.commands.get('reload').execute(message, loadCMD)
        } else if (command === 'info') {
            client.commands.get('info').execute(message, args, MessageEmbed, Version, Prefix)
        } else if (command === 'say') {
            client.commands.get('say').execute(message, db, client)
        } else if (command === 'ping') {
            client.commands.get('ping').execute(message, client, MessageEmbed, Prefix)
        } else if (command === 'help' || command === '?') {
            client.commands.get('help').execute(message, client, MessageEmbed, Prefix)
        } else if (command === 'search') {
            client.commands.get('search').execute(message, args, MessageEmbed, wh, Prefix)
            // } else if (command === 'announcement' || command === 'ac') {
            //     client.commands.get('announcement').execute(message, args, client)
        } else if (command === 'minecraft' || command === 'mc') {
            client.commands.get('minecraft').execute(message, args, wh, Prefix, MessageEmbed, command)
        }
        // } else if (command === 'canvas') {
        //     client.commands.get('canvas').execute(message, MessageAttachment)
        // }
    })

const status = (queue) => `**Volume:** \`${queue.volume}%\` **| Repeat:** \`${queue.repeatMode ? queue.repeatMode == 2 ? "Semua Lagu" : "Hanya Lagu Ini" : "Mati"}\`\n**Acak Lagu:** \`${queue.shuffle ? "Hidup" : "Mati"}\` **| Autoplay:** \`${queue.autoplay ? "Hidup" : "Mati"}\``

distube.on("playSong", async (message, queue, song) => {
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
        const ch = client.channels.cache.get(message.channel.id),
            webhooks = await ch.fetchWebhooks(),
            wh = webhooks.first();

        wh.send(':x: **Tidak ada orang di voice channel!**\n:no_entry: **Meninggalkan voice channel!**', {
            username: 'UniversNetwork Song Player',
            avatarURL: 'https://i.imgur.com/pBmA5S6.png'
        })
    })

    .on('noRelated', async message => {
        const ch = client.channels.cache.get(message.channel.id),
            webhooks = await ch.fetchWebhooks(),
            wh = webhooks.first();

        wh.send(':x: **Tidak ada lagu yang bisa diputar!\n:stop_button: **Menghentikan pemutar lagu!**', {
            username: 'UniversNetwork Song Player',
            avatarURL: 'https://i.imgur.com/pBmA5S6.png'
        })
    })

    .on('initQueue', queue => {
        queue.autoplay = false
        queue.volume = 100
    })

login(client, Token)
