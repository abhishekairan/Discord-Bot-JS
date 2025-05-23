import {Money,Rank,Coin,Servers,PanelDB} from './models.js';

export async function setPlayerPurseBalance(playerUUID, coins) {
	await PanelDB.query("UPDATE PlayerPurse SET coins = ? WHERE id = ?", [coins, playerUUID]);
}

export async function setPlayerPersonalBankBalance(playerUUID, coins) {
	await PanelDB.query("UPDATE PersonalBank SET coins = ? WHERE id = ?", [coins, playerUUID]);
}

export async function setPlayerSharedBankBalance(playerUUID, coins) {
	await PanelDB.query("UPDATE SharedBank SET coins = ? WHERE id = ?", [coins, playerUUID]);
}

export async function setPlayerClubCoinBalance(playerUUID, coins) {
	await PanelDB.query("UPDATE RoyaleEconomyclubcoins SET coins = ? WHERE id = ?", [coins, playerUUID]);
}

export async function updatePlayerBalances(playerUUID, balances) {
	const { SharedBankBalance, personalBankBalance, purseBalance, clubcoinBalance } = balances;

	if (SharedBankBalance !== undefined) {
		await setPlayerSharedBankBalance(playerUUID, SharedBankBalance);
	}

	if (personalBankBalance !== undefined) {
		await setPlayerPersonalBankBalance(playerUUID, personalBankBalance);
	}

	if (purseBalance !== undefined) {
		await setPlayerPurseBalance(playerUUID, purseBalance);
	}

	if (clubcoinBalance !== undefined) {
		await setPlayerClubCoinBalance(playerUUID, clubcoinBalance);
	}
}



export function addServer(id,uuid,name,identifier) {
    Servers.create({
        id: id,
        uuid: uuid,
        name: name,
        identifier: identifier 
    })
}
export function updateServer(id,uuid,name,identifier) {
    Servers.update({
        id: id,
        uuid: uuid,
        name: name,
    },{where: {
        identifier: identifier}})
}

export class MoneySetter{
    // Function to add new money purchase log
    static async addNew(data){
        if(data.dateOfPurchase){
            data.dateOfPurchase = new Date(data.dateOfPurchase)
        }else{
            data.dateOfPurchase = new Date()
        }
        console.log(data);
        const newMoneyLog = await Money.create(data)
        return newMoneyLog
        // console.log(`newMoneyLog: ${newMoneyLog}`);
    }

    // Delete money purchase log by id
    static async deleteById(id) {
        try {
            const deleted = await Money.destroy({where: {id: id}});
            console.log(`deleted: ${deleted}`);
            if(deleted > 0){
                // console.log(`Money Log with id ${id} deleted successfully`);
                return {message: `Money Log with id ${id} deleted successfully`,success:true};
            }else{
                return({message: `The Money Log with id ${id} didn't exist`,success:false});
            }
        } catch (error) {
            return({ message: error.message,success:false });
        }
    }
    
    // Delete money purchase log by UserID
    static async deleteByUserID(user) {
        try {
            const deleted = await Money.destroy({where: {UserID: user.id}});
            if(deleted > 0){
                // console.log(`Deleted ${deleted} Money Purchase log associated with ${UserID} UserID`);
                return {message: `Deleted ${deleted} Money Purchase log associated with ${user} UserID`,success:true};
            }else{
                return({message:`No Money Purchase log is associated with ${user}`,success:false});
            }
        } catch (error) {
            return{ message: error.message, success:true };
        }
    }


    // Update money purchase log with id
    static async updateById(ID,data){
        try{
            const updated = await Money.update(data,{where:{id:ID}});
            return updated
        }catch(error){
            console.log(error);
            return
        }
    }

}


// Class for handling Coin Setters
export class CoinSetter{
    // Function to add new Coin purchase log
    static async addNew(data){
        // data => {userID, cost, amount, dateOfPurchase, note}
        // console.log(`addNew.data: ${data.userID}`);
        if(data.dateOfPurchase){
            data.dateOfPurchase = new Date(data.dateOfPurchase)
        }else{
            data.dateOfPurchase = new Date()
        }

        const newCoinLog = await Coin.create(data)
        return newCoinLog
        // console.log(`newCoinLog: ${newCoinLog}`);
    }

    // Delete Coin purchase log by id
    static async deleteById(id) {
        try {
            const deleted = await Coin.destroy({where: {id: id}});
            console.log(`deleted: ${deleted}`);
            if(deleted > 0){
                // console.log(`Money Log with id ${id} deleted successfully`);
                return {message: `Coin Log with id ${id} deleted successfully`,success:true};
            }else{
                return({message: `The Coin Log with id ${id} didn't exist`,success:false});
            }
        } catch (error) {
            return({ message: error.message,success:false });
        }
    }
    
    // Delete coin purchase log by UserID
    static async deleteByUserID(user) {
        try {
            const deleted = await Coin.destroy({where: {UserID: user.id}});
            if(deleted > 0){
                // console.log(`Deleted ${deleted} Money Purchase log associated with ${UserID} UserID`);
                return {message: `Deleted ${deleted} Coin Purchase log associated with ${user} UserID`,success:true};
            }else{
                return({message:`No Coin Purchase log is associated with ${user}`,success:false});
            }
        } catch (error) {
            return{ message: error.message, success:true };
        }
    }


    // Update coin purchase log with id
    static async updateById(ID,data){
        try{
            const updated = await Coin.update(data,{where:{id:ID}});
            return updated
        }catch(error){
            console.log(error);
            return
        }
    }
}


// Class for handling Rank Setters
export class RankSetter{

    // Function to add new Rank purchase log
    static async addNew(data){
        // data => {name, duration, dateOfPurchase, userID, cost, note}
        // console.log(`addNew.data: ${data.userID}`);
        if(data.dateOfPurchase){
            data.dateOfPurchase = new Date(data.dateOfPurchase)
        }else{
            data.dateOfPurchase = new Date()
        }

        const newRanklog = await Rank.create(data)
        return newRanklog
        // console.log(`newCoinLog: ${newCoinLog}`);
    }

    // Delete Rank purchase log by id
    static async deleteById(id) {
        try {
            const deleted = await Rank.destroy({where: {id: id}});
            console.log(`deleted: ${deleted}`);
            if(deleted > 0){
                // console.log(`Money Log with id ${id} deleted successfully`);
                return {message: `Rank Log with id ${id} deleted successfully`,success:true};
            }else{
                return({message: `The Rank Log with id ${id} didn't exist`,success:false});
            }
        } catch (error) {
            return({ message: error.message,success:false });
        }
    }
    
    // Delete Rank purchase log by UserID
    static async deleteByUserID(user) {
        try {
            const deleted = await Rank.destroy({where: {UserID: user.id}});
            if(deleted > 0){
                // console.log(`Deleted ${deleted} Money Purchase log associated with ${UserID} UserID`);
                return {message: `Deleted ${deleted} Rank Purchase log associated with ${user} UserID`,success:true};
            }else{
                return({message:`No Rank Purchase log is associated with ${user}`,success:false});
            }
        } catch (error) {
            return{ message: error.message, success:true };
        }
    }


    // Update Rank purchase log with id
    static async updateById(ID,data){
        try{
            const updated = await Rank.update(data,{where:{id:ID}});
            return updated
        }catch(error){
            console.log(error);
            return
        }
    }
}

export default { 
    addServer,
    updateServer,
    MoneySetter,
    CoinSetter,
    RankSetter,
}