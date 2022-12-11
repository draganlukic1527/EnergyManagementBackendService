console.log("CHECK:::::: ====", process.env);
module.exports = {
	HOST: "localhost",
	USER: "root",
	PASSWORD: "606276Boy-",
	DB: "energymanagement",
	port: 3306,
	dialect: "mysql",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
