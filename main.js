const Discord = require('discord.js')
const client = new Discord.Client()
const Token = process.env.Token
const Prefix = process.env.Prefix

const fs = require('fs')
const ms = require('ms')
client.commands = new Discord.Collection
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.once('ready', () => {
    console.log('UniversNetwork Bot is online')
    client.user.setActivity(process.env.Status)
})

client.on('message', msg => {
    if (msg.content === "Halo?" || msg.content === "halo?" || msg.content === "halo" || msg.content === "Halo") {
        msg.reply('Hai!');
    }
})

client.on('message', msg => {
    if (msg.content === "Hello?" || msg.content === "hello?" || msg.content === "hello" || msg.content === "Hello") {
        msg.reply('Hi!');
    }
})

client.on('message', message => {
    if (!message.content.startsWith(Prefix) || message.author.bot) return
    const args = message.content.slice(Prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if (command === 'ip') {
        client.commands.get('ip').execute(message, args)
    } else if (command === 'version' || command === 'ver') {
        client.commands.get('version').execute(message, args)
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
        client.commands.get('play').execute(message, args)
    } else if (command === 'leave' || command === 'disconnect' || command === 'dc') {
        client.commands.get('leave').execute(message, args)
    } else if (command === 'help' || command === '?') {
        client.commands.get('help').execute(message, args)
    } else if (command === 'vote') {
        client.commands.get('vote').execute(message, args)
    } else if (command === 'join') {
        client.commands.get('join').execute(message, args)
    }
})

client.login(Token)