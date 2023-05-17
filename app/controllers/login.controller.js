const Login = require("../modals/login.modal");

exports.findUser = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);

	console.log("CONTROLLER:", req.params);
	console.log("REQ:", req.body);
	// Validate Requappest
	if (!req.body) {
		res.status(400).send({
			message: "Content Can't Be Empty!",
		});
	}

	// Create a User
	const login = new Login({
		EmailAddress: req.body.EmailAddress,
		PasswordHash: req.body.PasswordHash,
	});

	// Save user In Database
	Login.login(login, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Some error occurred while creating the user.",
			});
		else res.send(data);
	});
};
