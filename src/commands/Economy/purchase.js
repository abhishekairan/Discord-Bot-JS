import { SlashCommandBuilder, EmbedBuilder, Embed } from "discord.js";
import getter from "../../database/getter";
import setter from "../../database/setters";
import {colors,roles} from '../../config.json';


// Helper function to format data into a table
function formatDataTable(data, type,user=true) {
    // console.log(data);
    if (type === "rank") {
        if(!user) {

            const header = `ID | Date       | Rank  | Duration`;
            const separator = `-------------------------------------------------`;
            
            rows = data.map(({ id, dateOfPurchase, name, duration }) => {
                return `${String(id).padEnd(3)}| ${String(dateOfPurchase).padEnd(10)} | ${String(name).padEnd(5)} | ${String(`${duration} Days`).padEnd(8)}`;
            })
            
            return [header, separator, ...rows].join('\n');
        }else{

            const header = `ID | Date       | Rank  | Duration | User`;
            const separator = `--------------------------------------------------------`;
            
            rows = data.map(({ id, dateOfPurchase, name, duration, userID }) => {
                // console.log(`${String(id).padEnd(3)}| ${String(dateOfPurchase).padEnd(10)} | ${String(name).padEnd(5)} | ${String(`${duration} Days`).padEnd(8)} | ${userID}`);
                return `${String(id).padEnd(3)}| ${String(dateOfPurchase).padEnd(10)} | ${String(name).padEnd(5)} | ${String(`${duration} Days`).padEnd(8)} | ${userID}`;
            })
            
            return [header, separator, ...rows].join('\n');
        }
    }else{
        if(!user) {

            const header = `ID | Date       | Cost  | Amount`;
            const separator = `-----------------------------------------------`;
            
            rows = data.map(({ id, dateOfPurchase, cost, amount }) => {
                return `${String(id).padEnd(3)}| ${String(dateOfPurchase).padEnd(10)} | ${String(cost).padEnd(5)} | ${String(`${amount}`)}`;
            })
            
            return [header, separator, ...rows].join('\n');
        }else{

            const header = `ID | Date       | Cost  | Amount   | User`;
            const separator = `--------------------------------------------------------`;
            
            rows = data.map(({ id, dateOfPurchase, cost, amount, userID }) => {
                // console.log(`${String(id).padEnd(3)}| ${String(dateOfPurchase).padEnd(10)} | ${String(cost).padEnd(5)} | ${String(`${amount}`).padEnd(8)} | ${userID}`);
                return `${String(id).padEnd(3)}| ${String(dateOfPurchase).padEnd(10)} | ${String(cost).padEnd(5)} | ${String(`${amount}`).padEnd(8)} | ${userID}`;
            })
            
            return [header, separator, ...rows].join('\n');    
        }
    }
};


module.exports = {
    data: new SlashCommandBuilder()
        .setName('purchase')
        .setDescription("Add/Remove/Edit purchase log")
        // SubCommand Group for adding new purchase log
        .addSubcommandGroup(subcommandGroup => subcommandGroup   
            .setName("add")
            .setDescription("Add a new purchase log")

            // Sub command for adding money
            .addSubcommand(subcommand => subcommand
                .setName('money')
                .setDescription("Add a new money purchase log")
                // User option
                .addUserOption(option => option.setName('user').setDescription('User who purchased').setRequired(true))
                // Cost option
                .addIntegerOption(option => option.setName('cost').setDescription('Cost of the purchase').setRequired(true))
                // Amount option
                .addIntegerOption(option => option.setName('amount').setDescription('Amount of money').setRequired(true))
                // Date of purchase option
                .addStringOption(option => option.setName('date').setDescription("Date of Purchase. In YYYY-MM-DD format.").setRequired(false))
                // Note option
                .addStringOption(option => option.setName('note').setDescription('Any aditional note you want to add').setRequired(false))
            )

            // sub command for adding Coin
            .addSubcommand(subcommand => subcommand
                .setName('coin')
                .setDescription("Add a new coin purchase log")
                // User option
                .addUserOption(option => option.setName('user').setDescription('User who purchased').setRequired(true))
                // Cost option
                .addIntegerOption(option => option.setName('cost').setDescription('Cost of the purchase').setRequired(true))
                // Amount option
                .addIntegerOption(option => option.setName('amount').setDescription('Amount of coin user purchased').setRequired(true))
                // Date of purchase option
                .addStringOption(option => option.setName('date').setDescription("Date of Purchase. In YYYY-MM-DD format").setRequired(false))
                // Note option
                .addStringOption(option => option.setDescription('Any aditional note you want to add').setName('note'))
            )

            // sub command for adding rank
            .addSubcommand(subcommand => subcommand
                .setName('rank')
                .setDescription("Add a new rank purchase log")
                // Name option
                .addStringOption(option => option.setName('name').setDescription('Name of the rank').addChoices({name:"Knight",value:"vip"},{name:"Warrior",value:"vip+"},{name:"Emperor",value:"vip++"}).setRequired(true))
                // User option
                .addUserOption(option => option.setName('user').setDescription('User who purchased').setRequired(true))
                // Cost option
                .addIntegerOption(option => option.setName('cost').setDescription('Cost of the purchase').setRequired(true))
                // duration option
                .addIntegerOption(option => option.setName('duration').setDescription('Duration of the rank in days').setRequired(true))
                // Date of purchase option
                .addStringOption(option => option.setName('date').setDescription("Date of Purchase. In YYYY-MM-DD format").setRequired(false))
                // Note option
                .addStringOption(option => option.setDescription('Any aditional note you want to add').setName('note'))
            )
        )
        // Sub command group for removing purchase log
        .addSubcommandGroup(subcommandGroup => subcommandGroup
            .setName('remove')
            .setDescription("Remove a purchase log")
            // Sub command for removing Coin
            .addSubcommand(subcommand => subcommand
                .setName('coin')
                .setDescription("Remove a coin purchase log")
                .addUserOption(option => option.setName('user').setDescription('User whoes coin purchase you want to remove'))
                .addIntegerOption(option => option.setName('id').setDescription('Id of coin purchase log which you want to remove'))
            )
            // Sub command for removing Money
            .addSubcommand(subcommand => subcommand
                .setName('money')
                .setDescription("Remove a money purchase log")
                .addUserOption(option => option.setName('user').setDescription('User whoes money purchase you want to remove'))
                .addIntegerOption(option => option.setName('id').setDescription('Id of money purchase log which you want to remove'))
            )
            // Sub command for removing rank
            .addSubcommand(subcommand => subcommand
                .setName('rank')
                .setDescription("Remove a rank purchase log")
                .addUserOption(option => option.setName('user').setDescription('User whoes rank purchase you want to remove'))
                .addIntegerOption(option => option.setName('id').setDescription('Id of rank purchase log which you want to remove'))
            )
        )
        // Sub command group for showing all logs
        .addSubcommand(subcommand => subcommand
            .setName('show')
            .setDescription('Show purchase log of a user or a type')
            .addUserOption(option => option
                .setName('user')
                .setDescription('User whose purchase log you want to show')
            )
            .addIntegerOption(option => option
                .setName('id')
                .setDescription('Show the purchase log details with id')
            )
            .addStringOption(option => option
                .setName('type')
                .setDescription('Show the purchase log of a specific type')
                .setChoices(
                    {name:'Coin',value:'coin'},
                    {name:'Money',value:'money'},
                    {name:'Rank',value:'rank'}
                )
            )
        ),

    async execute(interaction){
        // Checking if user has manager role
        if(!interaction.member.roles.cache.has(roles.manager)) {
            const embed = new EmbedBuilder().setTitle("Permission Denied").setDescription("Only Managers are allowed to use this command")
            return interaction.reply({embeds: [embed],ephemeral: true})
        }

        const subcommandgroup = interaction.options.getSubcommandGroup()
        const slashsubcommand = interaction.options.getSubcommand()

        // checking which sub command is selected
        if (subcommandgroup === 'add') {
            const subcommand = interaction.options.getSubcommand()
            if (subcommand==='money') {
                const user = interaction.options.getUser('user')
                const cost = interaction.options.getInteger('cost')
                const amount = interaction.options.getInteger('amount')
                const date = interaction.options.getString('date')
                const note = interaction.options.getString('note')
                // console.log(`User: ${user.id}, Cost: ${cost},Amount: ${amount},Date: ${date},Note: ${note}`);
                // User: 1172587529631969341, Cost: 100,Amount: 200,Date: null,Note: null
                await setter.MoneySetter.addNew({
                    userID: user.id, 
                    cost: cost, 
                    amount: amount, 
                    dateOfPurchase: date, 
                    note: note
                })
                const embed = new EmbedBuilder().setTitle("Added Purchase Log").setDescription(`Successfully added a new Money Purchase log for ${user}`).setColor(colors.green)
                interaction.reply({embeds: [embed],ephemeral:true})
            }else if (subcommand==='coin') {
                const user = interaction.options.getUser('user')
                const cost = interaction.options.getInteger('cost')
                const amount = interaction.options.getInteger('amount')
                const date = interaction.options.getString('date')
                const note = interaction.options.getString('note')
                // console.log(`User: ${user.id}, Cost: ${cost},Amount: ${amount},Date: ${date},Note: ${note}`);
                // User: 1172587529631969341, Cost: 100,Amount: 200,Date: null,Note: null
                await setter.CoinSetter.addNew({
                    userID: user.id,
                    cost: cost,
                    amount: amount,
                    dateOfPurchase: date,
                    note: note
                })
                const embed = new EmbedBuilder().setTitle("Added Purchase Log").setDescription(`Successfully added a new Coin Purchase log for ${user}`).setColor(colors.green)
                interaction.reply({embeds: [embed],ephemeral:true})
            }else if (subcommand==='rank') {
                const name = interaction.options.getString('name')
                const user = interaction.options.getUser('user')
                const cost = interaction.options.getInteger('cost')
                const duration = interaction.options.getInteger('duration')
                const date = interaction.options.getString('date')
                const note = interaction.options.getString('note')
                // console.log(`User: ${user.id}, Cost: ${cost},Amount: ${amount},Date: ${date},Note: ${note}`);
                // User: 1172587529631969341, Cost: 100,Amount: 200,Date: null,Note: null
                await setter.RankSetter.addNew({
                    name: name,
                    userID: user.id, 
                    cost: cost, 
                    duration: duration, 
                    dateOfPurchase: date, 
                    note: note
                })
                const embed = new EmbedBuilder().setTitle("Added Purchase Log").setDescription(`Successfully added a new Rank Purchase log for ${user}`).setColor(colors.green)
                interaction.reply({embeds: [embed],ephemeral:true})
            }
            
        }else if(subcommandgroup === 'remove'){

            const id = interaction.options.getInteger('id')
            const user = interaction.options.getUser('user')
            if(id && user){
                const embed = new EmbedBuilder().setTitle(`Failed To Delete Purchase Log`).setDescription('You can not give user and id both, select one option').setColor(colors.red)
                return interaction.reply({embeds: [embed],ephemeral:true})
            }else if(!(id || user)){
                const embed = new EmbedBuilder().setTitle('Incomplete command').setDescription('Please proivde atleast one option [id or user] to delete a purchase log').setColor(colors.red)
                return interaction.reply({embeds: [embed],ephemeral:true})
            }

            const subcommand = interaction.options.getSubcommand()
            if (subcommand==='money') {
                let data
                if(id){
                    data = await setter.MoneySetter.deleteById(id)
                }else if(user){
                    data = await setter.MoneySetter.deleteByUserID(user)
                }
                // console.log(data);
                let embed
                if(data.success){
                    embed = new EmbedBuilder().setTitle("Deleted Money Purchase log").setDescription(data.message).setColor(colors.green).setTimestamp()
                }else{
                    embed = new EmbedBuilder().setTitle("Failed To Delete Purchase Log").setDescription(data.message).setColor(colors.red).setTimestamp()
                }
                interaction.reply({embeds: [embed],ephemeral:true})
            }else if (subcommand==='coin') {
                let data
                if(id){
                    data = await setter.CoinSetter.deleteById(id)
                }else if(user){
                    data = await setter.CoinSetter.deleteByUserID(user)
                }
                console.log(data);
                let embed
                if(data.success){
                    embed = new EmbedBuilder().setTitle("Deleted Coin Purchase log").setDescription(data.message).setColor(colors.green).setTimestamp()
                }else{
                    embed = new EmbedBuilder().setTitle("Failed To Delete Purchase Log").setDescription(data.message).setColor(colors.red).setTimestamp()
                }
                interaction.reply({embeds: [embed],ephemeral:true})
            }else if (subcommand==='rank') {
                let data
                if(id){
                    data = await setter.RankSetter.deleteById(id)
                }else if(user){
                    data = await setter.RankSetter.deleteByUserID(user)
                }
                console.log(data);
                let embed
                if(data.success){
                    embed = new EmbedBuilder().setTitle("Deleted Rank Purchase log").setDescription(data.message).setColor(colors.green).setTimestamp()
                }else{
                    embed = new EmbedBuilder().setTitle("Failed To Delete Purchase Log").setDescription(data.message).setColor(colors.red).setTimestamp()
                }
                interaction.reply({embeds: [embed],ephemeral:true})
            }
        }
        // Handling show option
        else if(slashsubcommand === 'show'){
            const user = interaction.options.getUser('user');
            const id = interaction.options.getInteger('id');
            const type = interaction.options.getString("type");
            let embed = new EmbedBuilder()
            let data

            // If id and user given (invalid command)
            if (id && user){
                embed.setTitle("Invalid Command!!!").setDescription("You can not select id and user togther").setColor(colors.red);
            }else if(id && type){
                if(type === 'money' || type==='coin'){
                    data = await getter.MoneyGetter.getByID(id)
                    console.log(data.userID);
                    const user = await interaction.guild.members.fetch(`${data.userID}`)
                    console.log(user.id);
                    type === 'money' ? embed.setTitle('Money Purchase Log') : embed.setTitle("Coin Purchase Log");
                    embed.addFields(
                        {name:'ID' ,value: String(data.id),inline:true},
                        {name: 'Date',value: String(data.dateOfPurchase),inline:true},
                        {name: 'User',value: String(user),inline:false},
                        {name: 'Cost',value: String(data.cost),inline:true},
                        {name: 'Amount',value: String(data.amount),inline:true},
                        {name: 'Note',value: String(data.note)}
                    )
                }
                if(type === 'rank'){
                    data = await getter.RankGetter.getByID(id)
                    console.log(data.userID);
                    const user = await interaction.guild.members.fetch(`${data.userID}`)
                    console.log(user.id);
                    embed.setTitle('Rank Purchase Log').addFields(
                        {name:'ID' ,value: String(data.id),inline:true},
                        {name: 'Date',value: String(data.dateOfPurchase),inline:true},
                        {name: 'Name',value: String(data.name),inline:true},
                        {name: 'User',value: String(user),inline:false},
                        {name: 'Cost',value: String(data.cost),inline:true},
                        {name: 'Duration',value: String(data.duration),inline:true},
                        {name: 'Note',value: String(data.note)}
                    )
                }
            }
            // If only type is given
            else if(type){
                embed.setTitle("Purchase Logs").setDescription("Here is the list of most recent purchase logs")
                if(type === 'coin'){
                    data = await getter.CoinGetter.getAll()
                    if(data.length){
                        embed.setTitle("Coin Logs").setDescription(`\`\`\`${formatDataTable(data,'coin')}\`\`\``)
                    }else{
                        embed.setTitle('Not Found').setDescription('There are no Coin Purchase Logs').setColor(colors.red)
                    }
                }else if(type==='money'){
                    data = await getter.MoneyGetter.getAll()
                    if(data.length){
                        embed.setTitle("Money Logs").setDescription(`\`\`\`${formatDataTable(data,'money')}\`\`\``)
                    }else{
                        embed.setTitle('Not Found').setDescription('There are no Money Purchase Logs').setColor(colors.red)
                    }
                }else if(type==='rank'){
                    data = await getter.RankGetter.getAll()
                    if(data.length){
                        embedata = formatDataTable(data,'rank')
                        // console.log(embedata);
                        embed.setTitle("Rank Logs").setDescription(`\`\`\`${embedata}\`\`\``)
                    }else{
                        embed.setTitle('Not Found').setDescription('There are no Rank Purchase Logs').setColor(colors.red)
                    }
                }
            }
            // if only user is given
            else if (user) {
                // Setting title of the embed (changes later according to the conditions)
                embed.setTitle(`${user.displayName}'s Purchase Logs`);
                // if type of purchase log is given sortting the logs according
                if(type) {
                    // Sorting the data according to rank purchase log
                    if(type === "rank"){
                        // fetching rank data using getter functions
                        data = getter.RankGetter.getByUserID(user.id)
                        // If user has some rank purchase log associated
                        if(data.length){
                            embed.setTitle(`${user.displayName}'s Rank Purchase Logs`).setDescription(`\`\`\`${formatDataTable(data,'rank',false)}\`\`\``)
                        }
                        // If user has no purchase log 
                        else{
                            embed.setTitle(`${user.displayName}'s Rank Purchase Logs`).setDescription("User has not purchased anything yet!!!")
                        }
                    }
                    // Sorting data according to the coin purchase log
                    else if(type==='coin'){
                        // fetching coin rank purchase logs
                        data = getter.CoinGetter.getByUserID(user.id)
                        // If user has some coin purchase logs
                        if(data.length){
                            embed.setTitle(`${user.displayName}'s Coin Purchase Logs`).setDescription(`\`\`\`${formatDataTable(data,'rank',false)}\`\`\``)
                        }
                        // If user has no coin purchase log
                        else{
                            embed.setTitle(`${user.displayName}'s Coin Purchase Logs`).setDescription("User has not purchased anything yet!!!")
                        }
                    }
                    // sorting data according the money purchase log
                    else if(type==='money'){
                        // fetching money purchase log using getter 
                        data = getter.MoneyGetter.getByUserID(user.id)
                        // if user has some purchase log
                        if(data.length){
                            embed.setTitle(`${user.displayName}'s Money Purchase Logs`).setDescription(`\`\`\`${formatDataTable(data,'rank',false)}\`\`\``)
                        }
                        // if user has no purchase log
                        else{
                            embed.setTitle(`${user.displayName}'s Money Purchase Logs`).setDescription("User has not purchased anything yet!!!")
                        }
                    }
                }
                // if type filter is not given showing all purchase log associated with user
                else{
                    [moneyData, coinData, rankData] = await Promise.all([
                        getter.MoneyGetter.getByUserID(user.id),
                        getter.CoinGetter.getByUserID(user.id),
                        getter.RankGetter.getByUserID(user.id)
                    ]);
                    
                    if(!(moneyData.length && coinData.length && rankData.length)) {
                        embed.setDescription("User has not purchased anything yet!!!")
                    }
                    // Adding separate fields for each type
                    if (moneyData.length) {
                        embed.addFields({ name: 'Money Logs', value: `\`\`\`${formatDataTable(moneyData, 'money')}\`\`\`` });
                    }
                    if (coinData.length) {
                        embed.addFields({ name: 'Coin Logs', value: `\`\`\`${formatDataTable(coinData, 'coin')}\`\`\`` });
                    }
                    if (rankData.length) {
                        embed.addFields({ name: 'Rank Logs', value: `\`\`\`${formatDataTable(rankData, 'rank')}\`\`\`` });
                    }
                }
            }
            // if only id is given
            else if(id){
                embed.setTitle("Incomplete Command!!!").setDescription("Select which type of purchase log the id belongs to").setColor(color.red);
            }
            // to show all purchase log If nothing optional attribute is given 
            else{
                data = await getter.PurchaseLog.getAll(['money','rank','coin'])
                embed.setTitle("Purchase Logs")
                if(data.money.length) {
                    embed.addFields({ name: 'Money Logs', value: `\`\`\`${formatDataTable(data.money, 'money')}\`\`\`` });
                }else{
                    embed.addFields({ name: 'Money Logs', value: `\`\`\`There are no Money Purchase Logs\`\`\`` });
                }
                if(data.coin.length) {
                    embed.addFields({ name: 'Coin Logs', value: `\`\`\`${formatDataTable(data.coin, 'coin')}\`\`\`` });
                }else{
                    embed.addFields({ name: 'Coin Logs', value: `\`\`\`There are no Coin Purchase Logs\`\`\`` });
                }
                if(data.rank.length) {
                    embed.addFields({ name: 'Rank Logs', value: `\`\`\`${formatDataTable(data.rank, 'rank')}\`\`\`` });
                }else{
                    embed.addFields({ name: 'Rank Logs', value: `\`\`\`There are no Rank Purchase Logs\`\`\`` });
                }
            }
            // sending embed
            return await interaction.reply({embeds: [embed],ephemeral:true});
        }
    }
}