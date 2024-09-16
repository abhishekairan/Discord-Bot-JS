const { Events } = require('discord.js')

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(e){
        e.client.emit("guildMemberAdd",{
            user: {
              tag: 'NewPerson#1234',
            },
          })
        // console.log(e)

    }
}


