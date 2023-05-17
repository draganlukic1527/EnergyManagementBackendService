module.exports = (app) => {
	const user = require("../controllers/user.controller.js");

	var router = require("express").Router();

	// Create New User
	router.post("/", user.create);

	// Retreive all User Data
	router.get("/", user.findAll);

	// Find User By Id
	router.get("/:UserID", user.findById);

	// Update User By Id
	router.put("/:UserID", user.updateByUserID);

	// Delete User By Id
	router.delete("/:UserID", user.delete);

	// Delete User
	router.delete("/", user.deleteAll);

	app.use("/user", router);
};
