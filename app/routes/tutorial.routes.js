module.exports = (app) => {
	const tutorial = require("../controllers/tutorial.controller.js");

	var router = require("express").Router();

	// Create New User
	router.post("/", tutorial.create);

	// Retreive all User Data
	router.get("/", tutorial.findAll);

	// Find User By Id
	router.get("/:UserID", tutorial.findById);

	// Update User By Id
	router.put("/:UserID", tutorial.updateByUserID);

	// Delete User By Id
	router.delete("/:UserID", tutorial.delete);

	// Delete User
	router.delete("/", tutorial.deleteAll);

	app.use("/user", router);
};
