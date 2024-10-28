const { Sequelize , DataTypes} = require('sequelize')


const Database = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Servers = Database.define('servers', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	uuid: Sequelize.STRING,
	name: Sequelize.STRING,
	identifier: Sequelize.STRING,
})


const Money = Database.define('money', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	userID: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	cost: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
	amount: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	dateOfPurchase: {
		type: DataTypes.DATE,
		allowNull: false
	},
	note:{
		type: DataTypes.STRING,
		allowNull: true
	}

})


const Coin = Database.define('coin', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	userID: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	cost: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
	amount: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	dateOfPurchase: {
		type: DataTypes.DATE,
		allowNull: false
	},
	note:{
		type: DataTypes.STRING,
		allowNull: true
	}

})

const Rank = Database.define('rank',{
	id:{
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	name:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	duration:{
		type: DataTypes.INTEGER,
		allowNull: false
	},
	dateOfPurchase:{
		type: DataTypes.DATE,
		allowNull: false
	},
	userID: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	cost: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
	note:{
		type: DataTypes.STRING,
		allowNull: true
	}
	
})

module.exports = {Database,Servers,Money,Rank,Coin}