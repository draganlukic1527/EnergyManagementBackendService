const sql = require("./db.js");
const util = require("util");

const Tutorial = function (tutorial) {
	this.EmailAddress = tutorial.EmailAddress;
	this.PasswordHash = tutorial.PasswordHash;
	this.UserType = tutorial.UserType;
	this.UserRole = tutorial.UserRole;
	this.EnergyProvider = tutorial.EnergyProvider;
	this.FirstName = tutorial.FirstName;
	this.MiddleName = tutorial.MiddleName;
	this.LastName = tutorial.LastName;
	this.RegisteredDate = tutorial.RegisteredDate;
	this.LastLogin = tutorial.LastLogin;
	this.EnergyData = tutorial.EnergyData;
	this.StreetAddress = tutorial.StreetAddress;
	this.Zip = tutorial.Zip;
	this.City = tutorial.City;
	this.State = tutorial.State;
};

Tutorial.create = (newTutorial, result) => {
	newTutorial.EnergyData = JSON.stringify(newTutorial.EnergyData);
	sql.query("INSERT INTO User SET ?", newTutorial, (err, res) => {
		console;
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created tutorial: ", { newTutorial });
		result(null, { newTutorial });
	});
};

Tutorial.findById = (UserID, result) => {
	sql.query(`SELECT * FROM User WHERE UserID = "${UserID}"`, (err, res) => {
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

		// not found Tutorial with the id
		result({ kind: "not_found" }, null);
	});
};

Tutorial.findAll = (title, result) => {
	let query = "SELECT * FROM User";

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
		console.log("tutorials: ", res);
		result(null, res);
	});
};

Tutorial.updateByUserID = (UserID, tutorial, result) => {
	let query =
		"UPDATE User SET EmailAddress = ?, PasswordHash = ?, UserType = ?, UserRole = ?, EnergyProvider = ?, FirstName = ?, MiddleName = ?, LastName = ?, RegisteredDate = ?, LastLogin = ?, EnergyData = ?, Zip = ?, City = ?, State = ? WHERE UserID = ?";
	sql.query(
		query,
		[
			tutorial.EmailAddress,
			tutorial.PasswordHash,
			tutorial.UserType,
			tutorial.UserRole,
			tutorial.EnergyProvider,
			tutorial.FirstName,
			tutorial.MiddleName,
			tutorial.LastName,
			tutorial.RegisteredDate,
			tutorial.LastLogin,
			tutorial.EnergyData,
			tutorial.Zip,
			tutorial.City,
			tutorial.State,
			UserID,
		],
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				// not found Tutorial with the id
				result({ kind: "not_found" }, null);
				return;
			}

			console.log("updated tutorial: ", { UserID: UserID, ...tutorial });
			result(null, { UserID: UserID, ...tutorial });
		}
	);
};

Tutorial.remove = (id, result) => {
	sql.query("DELETE FROM User WHERE UserID = ?", id, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			// not found Tutorial with the id
			result({ kind: "not_found" }, null);
			return;
		}

		console.log("deleted tutorial with id: ", id);
		result(null, res);
	});
};

Tutorial.removeAll = (result) => {
	sql.query("DELETE FROM User", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log(`deleted ${res.affectedRows} tutorials`);
		result(null, res);
	});
};

module.exports = Tutorial;
