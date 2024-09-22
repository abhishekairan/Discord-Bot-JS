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





module.exports = {Database,Servers}