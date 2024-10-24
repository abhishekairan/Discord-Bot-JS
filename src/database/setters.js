const Models = require('./models')


function addServer(id,uuid,name,identifier) {
    Models.Servers.create({
        id: id,
        uuid: uuid,
        name: name,
        identifier: identifier 
    })
}

function addMoney(userID,type,cost,amount,date,note){
    let addMoney = {
        userID: userID,
        type: type,
        amount: amount,
        date: date,
    }
    if(cost){newRank.cost = cost}
    if(note){newRank.note = note}
    Models.Money.create(addMoney)
}

function addRank(type,duration,dateOfPurchase,userID,cost,note){
    let newRank = {
        type: type,
        duration: duration,
        dateOfPurchase: dateOfPurchase,
        userID: userID,
    }
    if(cost){newRank.cost = cost}
    if(note){newRank.note = note}
    Models.Rank.create(newRank)
}

module.exports = { addServer, addMoney, addRank }