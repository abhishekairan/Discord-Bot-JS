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
	amount: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false
	},
	cost: {
		type: DataTypes.INTEGER,
		allowNull: false
	}

})


module.exports = {Database,Servers}