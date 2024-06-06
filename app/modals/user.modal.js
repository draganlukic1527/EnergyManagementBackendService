const sql = require("./db.js");
const util = require("util");

const User = function (user) {
	this.EmailAddress = user.EmailAddress;
	this.PasswordHash = user.PasswordHash;
	this.UserType = "User";
	this.UserRole = "Client";
	this.EnergyProvider = user.EnergyProvider;
	this.FirstName = user.FirstName;
	this.MiddleName = user.MiddleName;
	this.LastName = user.LastName;
	this.RegisteredDate = user.RegisteredDate;
	this.LastLogin = user.LastLogin;
	this.EnergyData = user.EnergyData;
	this.StreetAddress = user.StreetAddress;
	this.Zip = user.Zip;
	this.City = user.City;
	this.State = user.State;
};

User.create = (newUser, result) => {
	newUser.EnergyData = JSON.stringify(newUser.EnergyData);
	sql.query("INSERT INTO USER SET ?", newUser, (err, res) => {
		console;
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created user: ", { newUser });
		result(null, { newUser });
	});
};

User.findById = (UserID, result) => {
	sql.query(`SELECT * FROM USER WHERE UserID = "${UserID}"`, (err, res) => {
		if (err) {
			console.log("error", err);
			result(err, null);
			return;
		}

		if (res.length) {
			console.log("found User: ", res[0]);
			for (const user of res) {
				const energyData = user.EnergyData;
				const updatedEnergyData = JSON.stringify(energyData);
				user.EnergyData = JSON.parse(updatedEnergyData);
			}
			result(null, res[0]);
			return;
		}

		// not found User with the id
		result({ kind: "not_found" }, null);
	});
};

User.findAll = (title, result) => {
	let query = "SELECT * FROM USER";

	if (title) {
		query += ` WHERE UserID LIKE '%${UserID}%'`;
	}

	sql.query(query, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}
		for (const user of res) {
			const energyData = user.EnergyData;
			const updatedEnergyData = JSON.stringify(energyData);
			user.EnergyData = JSON.parse(updatedEnergyData);
		}
		console.log("Users: ", res);
		result(null, res);
	});
};

User.updateByUserID = (UserID, user, result) => {
	let query =
		"UPDATE USER SET EmailAddress = ?, PasswordHash = ?, UserType = ?, UserRole = ?, EnergyProvider = ?, FirstName = ?, MiddleName = ?, LastName = ?, RegisteredDate = ?, LastLogin = ?, EnergyData = ?, Zip = ?, City = ?, State = ? WHERE UserID = ?";
	sql.query(
		query,
		[
			user.EmailAddress,
			user.PasswordHash,
			user.UserType,
			user.UserRole,
			user.EnergyProvider,
			user.FirstName,
			user.MiddleName,
			user.LastName,
			user.RegisteredDate,
			user.LastLogin,
			user.EnergyData,
			user.Zip,
			user.City,
			user.State,
			UserID,
		],
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				// not found user with the id
				result({ kind: "not_found" }, null);
				return;
			}

			console.log("updated user: ", { UserID: UserID, ...user });
			result(null, { UserID: UserID, ...user });
		}
	);
};

User.remove = (id, result) => {
	sql.query("DELETE FROM USER WHERE UserID = ?", id, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			// not found user with the id
			result({ kind: "not_found" }, null);
			return;
		}

		console.log("deleted user with id: ", id);
		result(null, res);
	});
};

User.removeAll = (result) => {
	sql.query("DELETE FROM USER", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log(`deleted ${res.affectedRows} users`);
		result(null, res);
	});
};

User.linkUtilityAccount = (result) => {
	let query =
		"UPDATE USER SET EmailAddress = ?, PasswordHash = ?, UserType = ?, UserRole = ?, EnergyProvider = ?, FirstName = ?, MiddleName = ?, LastName = ?, RegisteredDate = ?, LastLogin = ?, EnergyData = ?, Zip = ?, City = ?, State = ? WHERE UserID = ?";
	sql.query(
		query,
		[
			user.EmailAddress,
			user.PasswordHash,
			user.UserType,
			user.UserRole,
			user.EnergyProvider,
			user.FirstName,
			user.MiddleName,
			user.LastName,
			user.RegisteredDate,
			user.LastLogin,
			user.EnergyData,
			user.Zip,
			user.City,
			user.State,
			UserID,
		],
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				// not found user with the id
				result({ kind: "not_found" }, null);
				return;
			}

			console.log("updated user: ", { UserID: UserID, ...user });
			result(null, { UserID: UserID, ...user });
		}
	);
};

module.exports = User;
