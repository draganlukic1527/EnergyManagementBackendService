const Tutorial = require("../modals/tutorial.modal");

exports.create = (req, res) => {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: "Content Can't Be Empty!",
		});
	}

	// Create a User
	const tutorial = new Tutorial({
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
		EnergyData: req.body.EnergyData,
		StreetAddress: req.body.StreetAddress,
		Zip: req.body.Zip,
		City: req.body.City,
		State: req.body.State,
	});

	// Save Tutorial In Database
	Tutorial.create(tutorial, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Tutorial.",
			});
		else res.send(data);
	});
};

exports.findAll = (req, res) => {
	const EmailAddress = req.query.EmailAddress;

	Tutorial.findAll(EmailAddress, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving tutorials.",
			});
		else res.send(data);
	});
};

exports.findById = (req, res) => {
	console.log("REQ", req.params);
	Tutorial.findById(req.params.UserID, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Tutorial with id ${req.params.UserID}.`,
				});
			} else {
				res.status(500).send({
					message: "Error retrieving Tutorial with id " + req.params.UserID,
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

	Tutorial.updateByUserID(
		req.params.UserID,
		new Tutorial(req.body),
		(err, data) => {
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
		}
	);
};

exports.delete = (req, res) => {
	Tutorial.remove(req.params.UserID, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Tutorial with id ${req.params.UserID}.`,
				});
			} else {
				res.status(500).send({
					message: "Could not delete Tutorial with id " + req.params.UserID,
				});
			}
		} else res.send({ message: `Tutorial was deleted successfully!` });
	});
};

exports.deleteAll = (req, res) => {
	Tutorial.removeAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all tutorials.",
			});
		else res.send({ message: `All Tutorials were deleted successfully!` });
	});
};
