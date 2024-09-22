const { Servers } = require('./models')


async function addServer(id,uuid,name,identifier) {
    Servers.create({
        id: id,
        uuid: uuid,
        name: name,
        identifier: identifier 
    })
}

module.exports = { addServer: addServer }