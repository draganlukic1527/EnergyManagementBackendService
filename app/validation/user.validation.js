const userDataValidate = (req, res, next) => {
	if (!req.body.EmailAddress) {
		throw Error("Email is required");
	}

	// Check valid Email
	const validEmailRegex =
		"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
	const isValidEmail = req.body.EmailAddress.match(validEmailRegex);
	if (!isValidEmail) {
		throw Error("Invalid Email");
	}

	if (!req.body.PasswordHash) {
		throw Error("Password is required");
	}

	const validPasswordRegex =
		"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
	const isValidPassword = req.body.PasswordHash.match(validPasswordRegex);
	if (!isValidPassword) {
		throw Error(
			"Invalid Password (Please include an upper case character, lower case character, 8 characters long, number, and special character)"
		);
	}

	if (!req.body.FirstName) {
		throw Error("First name is required");
	}

	if (!req.body.LastName) {
		throw Error("Last name is required");
	}

	if (!req.body.StreetAddress) {
		throw Error("Street address is required");
	}

	if (!req.body.Zip) {
		throw Error("Zip code is required");
	}

	if (!req.body.City) {
		throw Error("City is required");
	}

	if (!req.body.State) {
		throw Error("State is required");
	}
};

module.exports = { userDataValidate };
