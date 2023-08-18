const sql = require("./db.js");
const util = require("util");

const Login = function (login) {
	this.EmailAddress = login.EmailAddress;
	this.PasswordHash = login.PasswordHash;
};

Login.login = (login, result) => {
	sql.query(
		`SELECT * FROM USER WHERE EmailAddress = "${login.EmailAddress}" AND PasswordHash =  "${login.PasswordHash}"`,
		(err, res) => {
			if (err) {
				console.log("error", err);
				result(err, null);
				return;
			}

			if (res.length) {
				for (const user of res) {
					const energyData = user.EnergyData;
					const updatedEnergyData = JSON.stringify(energyData);
					user.EnergyData = JSON.parse(updatedEnergyData);
				}
				console.log("found User: ", res[0]);
				result(null, res[0]);
				return;
			}

			// not found user with the id
			result({ kind: "not_found" }, null);
		}
	);
};

module.exports = Login;
