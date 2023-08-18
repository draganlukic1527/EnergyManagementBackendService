module.exports = (app) => {
	const utility = require("../controllers/utilityAPI.controller.js");

	var router = require("express").Router();

	// Create New form
	router.post("/getForms", utility.createForms);

	app.use("/utility", router);
};
