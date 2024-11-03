const { Database, Servers,Money,Rank,Coin } = require('./models')


function getCurrentISTDate() {
  const today = new Date();

  // Convert to IST using `toLocaleString` with `Asia/Kolkata` timezone
  const istDate = today.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // // Extract day, month, and year from the IST date string
  // const [day, month, year] = istDate.split(',')[0].split('/');  // '24/10/2024'

  // return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
  return istDate;
}


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




class MoneyGetter{
  // Function to get money purchase log filtered using userID
  static async getByUserID(userID){
    if(userID){
      return new Promise((resolve,reject) => {
        try{
          const money = Money.findAll({where: {userID: userID}})
          resolve(money)
        }catch (err){
          console.log(err);
          reject('No record found')
        }
      })
    }
  }
  // Function to get money purchase log filtered using ID
  static async getByID(ID){
    if(ID){
      return new Promise((resolve,reject) => {
        try{
          const money = Money.findOne({where: {id: ID}})
          resolve(money)
        }catch(err){
          console.log(err);
          reject(err);
        }
      })
    }
  }
  // Function to get all money purchase log
  static async getAll(){
    return new Promise((resolve,reject) => {
      try{
        const money = Money.findAll()
        resolve(money)
      }catch(err){
        console.log(err);
        reject('No record found')
      }
    })
  }
}

class CoinGetter{
  // Function to get Coin purchase log filtered using userID
  static async getByUserID(userID){
    if(userID){
      return new Promise((resolve,reject) => {
        try{
          const coin = Coin.findAll({where: {userID: userID}})
          resolve(coin)
        }catch (err){
          console.log(err);
          reject('No record found')
        }
      })
    }
  }
  // Function to get coin purchase log filtered using ID
  static async getByID(ID){
    if(ID){
      return new Promise((resolve,reject) => {
        try{
          const coin = Coin.findOne({where: {ID: ID}})
          resolve(coin)
        }catch(err){
          console.log(err);
          reject(err);
        }
      })
    }
  }
  // Function to get all coin purchase log
  static async getAll(){
    return new Promise((resolve,reject) => {
      try{
        const coin = Coin.findAll()
        resolve(coin)
      }catch(err){
        console.log(err);
        reject('No record found')
      }
    })
  }
}

class RankGetter{
  // Function tog get Rank purchase log filtered using userID
  static async getByUserID(userID){
    return new Promise((resolve,reject) => {
      try{
        const rank = Rank.findAll({where: {userID: userID}})
        resolve(rank)
      }catch (err){
        console.log(err);
        reject('No record found')
      }
    })
  }
  // Function tog get Rank purchase log filtered using ID
  static async getByID(ID){
    try{
      const rank = Rank.findOne({where: {ID: ID}})
      return rank
    }catch(err){
      console.log(err);
      reject(`No record found`)
    }
  }
  // Function tog get all Rank purchase log
  static async getAll(limit,offset){
    try {
      const rank = Rank.findAll({limit:limit,offset:offset,order: [['createdAT','DESC']]})
      return rank
    } catch (error) {
      console.log(error);      
      reject('No record Found')
    }
  }
}



class PurchaseLog{

  static async getAll(typeList){
    let data={}
    
    for (const type of typeList) {
      // console.log(type);
      if (type === 'rank') {
          const rankData = await RankGetter.getAll();
          data['rank'] = rankData; // Push the result into the data array
      } else if (type === 'money') {
          const moneyData = await MoneyGetter.getAll();
          data['money'] = moneyData; // Push the result into the data array
      } else if (type === 'coin') {
          const coinData = await CoinGetter.getAll();
          data['coin'] = coinData; // Push the result into the data array
      }
    }
    // console.log(data.money);
    return data
  }
  
}



// (async() => {
//   console.log("Async function executed");
//   console.log( await MoneyGetter.getAll());
// })()
module.exports = {
  getservers: getservers,
  getserverbyname: getserverbyname,
  getserverbyuuid: getserverbyuuid,
  getCurrentISTDate: getCurrentISTDate,
  MoneyGetter: MoneyGetter,
  CoinGetter: CoinGetter,
  RankGetter: RankGetter,
  PurchaseLog
}