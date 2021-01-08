const Discord = require('discord.js')
const client = new Discord.Client()
const Canvas = require('canvas')
const { MessageAttachment, MessageEmbed, GuildChannel } = require('discord.js')
const path = require('path')
const { Token, Prefix, Version } = require('./config.json')

client.on('guildMemberAdd', async (member) => {
    const { guild } = member
    console.log(member)
    let channel = '761875413223735296'
    if (member.guild.id != '761872006513033238') return
    if (!channel) return
    const canvas = Canvas.createCanvas(555, 260)
    const ctx = canvas.getContext('2d')

    const background = await Canvas.loadImage(
        path.join(__dirname, './background.png')
    )

    let x = 0
    let y = 0
    ctx.drawImage(background, x, y)

    const pfp = await Canvas.loadImage(
        member.user.displayAvatarURL({
            format: 'png',
        })
    )
    x = canvas.width / 2 - pfp.width / 2
    y = 25
    ctx.drawImage(pfp, x, y)

    ctx.fillStyle = '#ffffff' // White text
    ctx.font = '35px sans-serif'
    let text = `Welcome ${member.user.tag}!`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 60 + pfp.height)

    // Display member count
    ctx.font = '30px sans-serif'
    text = `Member #${guild.memberCount}`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 100 + pfp.height)

    const attachment = new MessageAttachment(canvas.toBuffer())
    client.channels.cache.get(channel).send('', attachment)
})
function loadCMD() {
    const fs = require('fs')
    const ms = require('ms')
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
            'Cave Block On Progress'
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
    const args = message.content.slice(Prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()
    const getChannel = client.channels.cache.get(message.channel.id)

    if (command === 'ip') {
        client.commands.get('ip').execute(message, args)
    } else if (command === 'version' || command === 'ver') {
        client.commands.get('version').execute(message, Version)
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
        client.commands.get('play').execute(message, args, MessageEmbed, client)
    } else if (command === 'leave' || command === 'disconnect' || command === 'dc') {
        client.commands.get('leave').execute(message, MessageEmbed, client)
    } else if (command === 'help' || command === '?') {
        client.commands.get('help').execute(message, MessageEmbed)
    } else if (command === 'vote') {
        client.commands.get('vote').execute(message, MessageEmbed)
    } else if (command === 'join' || command === 'summon' || command === 'connect') {
        client.commands.get('join').execute(message, MessageEmbed, client)
    } else if (command === 'verification' || command === 'verify') {
        client.commands.get('verification').execute(message, MessageEmbed, client)
    } else if (command === 'reload' || command === 'load') {
        client.commands.get('reload').execute(message, loadCMD)
    } else if (command === 'info') {
        client.commands.get('info').execute(message, args, MessageEmbed, Version)
    }
})

client.login(Token)