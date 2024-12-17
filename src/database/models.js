import { Sequelize , DataTypes} from 'sequelize'


export const Database = new Sequelize('keni', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

export const Servers = Database.define('servers', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	uuid: Sequelize.STRING,
	name: Sequelize.STRING,
	identifier: Sequelize.STRING,
})


export const Money = Database.define('money', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	userID: {
		type: DataTypes.STRING,
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
		type: DataTypes.DATEONLY,
		allowNull: false,
		defaultValue: DataTypes.NOW
	},
	note:{
		type: DataTypes.STRING,
		allowNull: true
	}

})


export const Coin = Database.define('coin', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	userID: {
		type: DataTypes.STRING,
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
		type: DataTypes.DATEONLY,
		allowNull: false,
		defaultValue: DataTypes.NOW
	},
	note:{
		type: DataTypes.STRING,
		allowNull: true
	}

})

export const Rank = Database.define('rank',{
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
		type: DataTypes.DATEONLY,
		allowNull: false,
		defaultValue: DataTypes.NOW
	},
	userID: {
		type: DataTypes.STRING,
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

export default {Database,Servers,Money,Rank,Coin}