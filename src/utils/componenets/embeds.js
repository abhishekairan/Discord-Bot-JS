import { EmbedBuilder } from "discord.js";
import config from '../../config.json' assert {type: 'json'};
const {colors} = config

// Emebd for money
export const moneyStore = new EmbedBuilder()
    .setTitle("Money Store")
    .setDescription("Run out of money? or want to stay high at leaderboard? You can buy in-gamem money from real money, it also help us running the server 😄")
    .addFields({name:"Price",value:"> 10₹  - 10k 💵\n> 20₹  - 25k 💵\n> 50₹  - 75k 💵\n> 100₹ - 200k 💵"})
    .setColor(colors.green)


// Emebd for coins
export const coinStore = new EmbedBuilder()
    .setTitle("Coin Store")
    .setDescription("Run out of coin? or want to stay high at leaderboard? You can buy Club Coins from real money, it also help us running the server 😄")
    .addFields({name:"Price",value:"> 30₹  - 50 🪙\n> 50₹  - 100 🪙\n> 80₹  - 150 🪙\n> 100₹ - 220 🪙\n> 200₹ - 500 🪙\n> 300₹ - 800 🪙\n> 500₹ - 1.5k 🪙"})
    .setColor(colors.yellow)


// Embed for ranks
export const rankStore = new EmbedBuilder()
    .setTitle("Rank Store")
    .setDescription("Enough of the restrictions? Tried of cooldown and non-access to command?? Want to standout from the crowd??? We got you!!! Checkout the ranks and permission which comes along.")
    .addFields([
        {name:"VIP", value: "> 300₹ [1 month]\n> 500₹ [2 months]\n> 800₹: [3 months]", inline: false},
        {name:"ELITE", value: "> 700₹ [1 month]\n> 1200₹ [2 months]\n> 1800₹: [3 months]", inline: false},
        {name:"ultra", value: "> 1K₹ [1 month]\n> 1800₹ [2 months]\n> 2500₹: [3 months]", inline: false},
        {name:"Details",value:"[Click Here to see full details](https://drive.google.com/file/d/1DF9cSOFKi2B_nvCHsLDGsFrz9xXDRxV-/view?usp=sharing)"}
    ])
    .setColor(colors.magenta)
    // .setImage('https://cdn.discordapp.com/attachments/933705643959910420/1295355783302615114/image.png?ex=670e5995&is=670d0815&hm=330d006b33f8d196639171c06021dabb8c41b0b7ea3237ff2612e850fcf4f041&')


export const keyStore = new EmbedBuilder({
    title: "Key Store",
    description: `Want to buy more crate key, don't worry we got you!!!`,
    fields: [
        {name:"Bundle 1 [50rs]", value: "- 10 x Epic Crates\n- 5 x Rare Crates\n- 2 x Legendary Crates",inline: true},
        {name:"Bundle 2 [100rs]", value: "- 20 x Epic Crates\n- 10 x Rare Crates\n- 5 x Legendary Crates",inline: true},
        {name:"Bundle 3 [250rs]", value: "- 50 x Epic Crates\n- 20 x Rare Crates\n- 10 x Legendary Crates",inline: true},
        {name:"Single Keys", value: "- 5rs/Epic Crate Key\n- 10rs/Rare Crate Key\n- 15rs/Legendary Crate key",}
    ],
}).setColor(colors.brown)


export const bundleStore = new EmbedBuilder({
    title: "Bundle Store",
    description: `Looking for offers to save money on? Checkout Bundles, Get the most in the least!!!`,
    fields: [
        {name:"VIP & Keys", value: `
- 1 month VIP + 2x Spawner key + 1x Armor key = 199rs 
- 2 month vip + 5x Spawner key + 2x Armor key  = 399rs
- 3 month vip + 5x Spawner key + 5x Armor key = 619rs`},
{name:"VIP+ & Keys", value: `
- 1 month VIP+ + 2x Spawner key + 1x Armor key = 550rs
- 2 month Vip+ + 5x Spawner key + 2x Armor key  =  1050rs
- 3 month Vip+ + 5x Spawner key + 5x Armor key = 1520rs`},
{name:"MVP & Keys", value: `
- 1 month MVP + 2x Spawner key + 1x Armor key = 720rs
- 2 month MVP + 5x Spawner key + 2x Armor key  = 1350rs
- 3 month MVP+ 5x Spawner key + 5x Armor key = 1999rs`},
    ],
}).setColor(colors.orange)

export default {moneyStore, coinStore, rankStore, keyStore, bundleStore}