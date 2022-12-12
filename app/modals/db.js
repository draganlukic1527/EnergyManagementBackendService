const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

/* Create Connection to Database */
const connection = mysql.createConnection({
	host: dbConfig.HOST,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB,
	port: dbConfig.DB_PORT,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

connection.connect((error) => {
	if (error) {
		throw error;
	}
	console.log("Successfully connected to database");
});

module.exports = connection;
