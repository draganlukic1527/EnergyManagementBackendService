const User = require("../modals/user.modal");
const utility = require("../controllers/utilityAPI.controller.js");

exports.create = (req, res) => {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: "Content Can't Be Empty!",
		});
	}

	// fetch utilityAPI Data
	utility
		.getEnergyBill()
		.then((energyBill) => {
			// Create a User
			const user = new User({
				EmailAddress: req.body.EmailAddress,
				PasswordHash: req.body.PasswordHash,
				UserType: req.body.UserType,
				UserRole: req.body.UserRole,
				EnergyProvider: req.body.EnergyProvider,
				FirstName: req.body.FirstName,
				MiddleName: req.body.MiddleName,
				LastName: req.body.LastName,
				RegisteredDate: req.body.RegisteredDate,
				LastLogin: req.body.LastLogin,
				EnergyData: energyBill,
				StreetAddress: req.body.StreetAddress,
				Zip: req.body.Zip,
				City: req.body.City,
				State: req.body.State,
			});

			// Save User In Database
			User.create(user, (err, data) => {
				if (err)
					res.status(500).send({
						message:
							err.message || "Some error occurred while creating the User.",
					});
				else res.send(data);
			});
		})
		.catch((err) => {
			// handle errors here
			console.log("Error: ", err);
		});
};

exports.findAll = (req, res) => {
	const EmailAddress = req.query.EmailAddress;

	User.findAll(EmailAddress, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving users.",
			});
		else res.send(data);
	});
};

exports.findById = (req, res) => {
	console.log("REQ", req.params);
	User.findById(req.params.UserID, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found User with id ${req.params.UserID}.`,
				});
			} else {
				res.status(500).send({
					message: "Error retrieving User with id " + req.params.UserID,
				});
			}
		} else res.send(data);
	});
};

exports.updateByUserID = (req, res) => {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	console.log(req.body);

	User.updateByUserID(req.params.UserID, new User(req.body), (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found User with id ${req.params.UserID}.`,
				});
			} else {
				res.status(500).send({
					message: "Error updating User with id " + req.params.UserID,
				});
			}
		} else res.send(data);
	});
};

exports.delete = (req, res) => {
	User.remove(req.params.UserID, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found User with id ${req.params.UserID}.`,
				});
			} else {
				res.status(500).send({
					message: "Could not delete User with id " + req.params.UserID,
				});
			}
		} else res.send({ message: `User was deleted successfully!` });
	});
};

exports.deleteAll = (req, res) => {
	User.removeAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Some error occurred while removing all Users.",
			});
		else res.send({ message: `All Users were deleted successfully!` });
	});
};
