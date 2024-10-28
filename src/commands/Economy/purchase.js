const { SlashCommandBuilder } = require("discord.js");

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
                .addStringOption(option => option.setName('amount').setDescription('Amount of money').setRequired(true))
                // Amount option
                .addIntegerOption(option => option.setName('amount').setDescription('Amount of money').setRequired(true)
                )
                // Date of purchase option
                .addStringOption(option => option.setName('date').setDescription("Date of Purchase").setRequired(false))
                // Note option
                .addStringOption(option => option
                    .setName('note')
                    .setDescription('Any aditional note you want to add')
                )
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
                .addStringOption(option => option.setName('amount').setDescription('Amount of coin user purchased').setRequired(true))
                // Date of purchase option
                .addStringOption(option => option.setName('date').setDescription("Date of Purchase").setRequired(false))
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
                .addStringOption(option => option.setName('duration').setDescription('Duration of the rank').setRequired(true))
                // Date of purchase option
                .addStringOption(option => option.setName('date').setDescription("Date of Purchase").setRequired(false))
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
        // Sub Command group for editing purchase log
        .addSubcommandGroup(subcommandGroup => subcommandGroup
            .setName('edit')
            .setDescription('Edit a pre exsisting purchase log')
            // Sub command for editing coin 
            .addSubcommand(subcommand => subcommand
                .setName('coin')
                .setDescription('Edit coin purchase log')
                .addIntegerOption(option => option
                    .setName('id')
                    .setDescription('ID of the coin purchase purchase log you want to edit')
                    .setRequired(true)
                )
            )
            // Sub command for editing money
            .addSubcommand(subcommand => subcommand
                .setName('money')
                .setDescription('Edit money purchase log')
                .addIntegerOption(option => option
                    .setName('id')
                    .setDescription('ID of the money purchase log you want to edit')
                    .setRequired(true)
                )
            )
            // Sub command for editing rank
            .addSubcommand(subcommand => subcommand
                .setName('rank')
                .setDescription('Edit rank purchase log')
                .addIntegerOption(option => option
                    .setName('id')
                    .setDescription('ID of the rank purchase log you want to edit')
                    .setRequired(true)
                )
            )
        )
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
        )
}