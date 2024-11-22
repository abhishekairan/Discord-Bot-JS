import { EmbedBuilder } from "discord.js";


// Emebd for money
const moneyStore = new EmbedBuilder()
    .setTitle("Money Store")
    .setDescription("Run out of money? or want to stay high at leaderboard? You can buy in-gamem money from real money, it also help us running the server 😄")
    .addFields({name:"Price",value:"> 10₹: 20k 💵\n> 20₹: 50k 💵\n> 50₹: 200k 💵\n> 100₹: 500k 💵"})


// Emebd for coins
const coinStore = new EmbedBuilder()
    .setTitle("Coin Store")
    .setDescription("Run out of coin? or want to stay high at leaderboard? You can buy Club Coins from real money, it also help us running the server 😄")
    .addFields({name:"Price",value:"> 10₹: 250 🪙\n> 20₹: 500 🪙\n> 50₹: 1.2k 🪙\n> 100₹: 3k 🪙"})


// Embed for ranks
const rankStore = new EmbedBuilder()
    .setTitle("Rank Store")
    .setDescription("Enough of the restrictions? Tried of cooldown and non-access to command?? Want to standout from the crowd??? We got you!!! Checkout the ranks and permission which comes along.")
    .addFields([
        {name:"Knight", value: "> 50₹ [1 Week]\n> 150₹ [1 month]\n> 250₹ [2 months]\n> 400₹: [3 months]", inline: false},
        {name:"Warrior", value: "> 150₹ [1 Week]\n> 500₹ [1 month]\n> 900₹ [2 months]\n> 1300₹: [3 months]", inline: false},
        {name:"Emperor", value: "> 250₹ [1 Week]\n> 650₹ [1 month]\n> 1200₹ [2 months]\n> 1800₹: [3 months]", inline: false},
        {name:"Details",value:"[Click Here to see full details](https://cdn.discordapp.com/attachments/933705643959910420/1295355783302615114/image.png?ex=670e5995&is=670d0815&hm=330d006b33f8d196639171c06021dabb8c41b0b7ea3237ff2612e850fcf4f041&)"}
    ])
    // .setImage('https://cdn.discordapp.com/attachments/933705643959910420/1295355783302615114/image.png?ex=670e5995&is=670d0815&hm=330d006b33f8d196639171c06021dabb8c41b0b7ea3237ff2612e850fcf4f041&')


module.exports = {moneyStore, coinStore, rankStore}