const { Database, Servers } = require('./models')


function getservers() {
  return new Promise((resolve,reject) => {
    try{
      const servers = Servers.findAll()
      resolve(servers)
    }catch (err){
      reject(err)
    }
  })
}

function getserverbyname(name) {
  return new Promise((resolve,reject) => {
    try{
      const server = Servers.findOne({ where: { name: name } })
      if (server){
        resolve(server)
      }else{
        reject("Server not found")
      }
    }catch (err){
      reject(err)
    }
  })
}

function getserverbyuuid(uuid) {
  return new Promise((resolve,reject) => {
    try{
      if (uuid) {
        const server = Servers.findOne({ where: { uuid: uuid } })
        resolve(server)
      }else {
        const servers = Servers.findAll()
        resolve(servers)
      }
    }catch (err){
      reject(err)
    }
  })
}



module.exports = {
  getservers: getservers,
  getserverbyname: getserverbyname,
  getserverbyuuid: getserverbyuuid,
}