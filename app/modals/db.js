const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

/* Create Connection to Database */
const connection = mysql.createConnection({
	host: dbConfig.HOST,
	port: dbConfig.DB_PORT,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

connection.connect((error) => {
	if (error) {
		console.error("Database connection failed: " + error.stack);
		return;
	}
	console.log("Successfully connected to database: ", dbConfig.DB_HOST);
});

module.exports = connection;
