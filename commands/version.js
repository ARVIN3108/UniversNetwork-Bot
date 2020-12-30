const version = process.env.Version
module.exports = {
    name: 'version',
    description: 'This is a version command',
    execute(message, args) {
        message.delete().then(message.channel.send('**Versi: ' + version + '**'))
    }
}