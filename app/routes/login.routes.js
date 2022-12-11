module.exports = (app) => {
	const login = require("../controllers/login.controller.js");

	var router = require("express").Router();

	// Login
	router.use("/", login.findUser);

	app.use("/login", router);
};
