const { Database, Servers } = require('./models')

async function getserver(uuid = null) {
  if (uuid) {
    const server = await Servers.findOne({ where: { uuid } })
    return server
  } else {
    const servers = await Servers.findAll()
    return servers
  }
}

module.exports = { getserver: getserver }