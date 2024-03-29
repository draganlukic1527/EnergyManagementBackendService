const https = require("https");
var config = require("../config/utility.config.js");

async function getUID() {
	let getFormUID = new Promise((resolve, reject) => {
		let data = ``;
		const request = https.request(
			{
				hostname: "utilityapi.com",
				path: "/api/v2/forms",
				method: "POST",
				headers: {
					Authorization: config.AUTH_TOKEN,
				},
			},
			(response) => {
				response.on("data", (chunk) => {
					data += chunk;
				});
				response.on("end", () => {
					resolve(JSON.parse(data).uid);
				});
			}
		);

		request.write(data);
		request.end();
	});

	return await getFormUID;
}

async function getReferralCode(uid) {
	const referralUID = uid;
	let getCode = new Promise(function (resolve, reject, uid) {
		let data = JSON.stringify({
			utility: "DEMO",
			scenario: "residential",
		});
		let responseBody = ``;
		const request = https.request(
			{
				hostname: "utilityapi.com",
				path: `/api/v2/forms/${referralUID}/test-submit`,
				method: "POST",
				headers: {
					Authorization: config.AUTH_TOKEN,
					"Content-Length": data.length,
				},
			},
			(response) => {
				response.on("data", (chunk) => {
					responseBody += chunk;
				});
				response.on("end", () => {
					resolve(JSON.parse(responseBody).referral);
				});
			}
		);
		request.on("error", (err) => {
			console.log("ERROR: ", err);
		});
		request.write(data);
		request.end();
	});

	return await getCode.then(referralUID);
}

async function getUserMeterId(referalId) {
	let getUserMeterId = new Promise(function (resolve, reject) {
		setTimeout(() => {
			let data = ``;
			let responseBody = ``;

			const request = https.request(
				{
					hostname: "utilityapi.com",
					path: `/api/v2/authorizations?referrals=${referalId}&include=meters`,
					method: "GET",
					headers: {
						Authorization: config.AUTH_TOKEN,
						"Content-Type": "application/json",
					},
				},
				(response) => {
					response.on("data", (chunk) => {
						responseBody += chunk;
					});
					response.on("end", () => {
						resolve(
							JSON.parse(responseBody).authorizations[0].meters.meters[0].uid
						);
					});
				}
			);
			request.write(data);
			request.end();
		}, 30000);
	});
	return await getUserMeterId.then(referalId);
}

async function activateUserMeter(meterId) {
	let activateUserMeter = new Promise(function (resolve, reject) {
		meterIdArr = JSON.stringify(meterId);

		let data = JSON.stringify({ meters: [meterId] });

		let responseBody = ``;
		const request = https.request(
			{
				hostname: "utilityapi.com",
				path: `/api/v2/meters/historical-collection`,
				method: "POST",
				headers: {
					Authorization: config.AUTH_TOKEN,
					"Content-Type": "application/json",
				},
			},
			(response) => {
				response.on("data", (chunk) => {
					responseBody += chunk;
				});
				response.on("end", () => {
					resolve(JSON.parse(responseBody));
				});
			}
		);
		request.on("error", (err) => {
			console.log("ERROR: ", err);
		});
		request.write(data);
		request.end();
	});
	return await activateUserMeter.then(meterId);
}

async function getUserMeterStatus(meterId) {
	let getUserMeterStatus = new Promise(function (resolve, reject) {
		setTimeout(() => {
			let data = ``;
			let responseBody = ``;
			const request = https.request(
				{
					hostname: "utilityapi.com",
					path: `/api/v2/meters/${meterId}`,
					method: "GET",
					headers: {
						Authorization: config.AUTH_TOKEN,
						"Content-Type": "application/json",
					},
				},
				(response) => {
					response.on("data", (chunk) => {
						responseBody += chunk;
					});
					response.on("end", () => {
						resolve(JSON.parse(responseBody));
					});
				}
			);
			request.on("error", (err) => {
				console.log("ERROR: ", err);
			});
			request.write(data);
			request.end();
		}, 60000);
	});
	return await getUserMeterStatus.then(meterId);
}

async function getUserEnergyBill(meterId) {
	let getUserEnergyBill = new Promise(function (resolve, reject) {
		let data = ``;
		let responseBody = ``;
		const request = https.request(
			{
				hostname: "utilityapi.com",
				path: `/api/v2/bills?meters=${meterId}`,
				method: "GET",
				headers: {
					Authorization: config.AUTH_TOKEN,
					"Content-Type": "application/json",
				},
			},
			(response) => {
				response.on("data", (chunk) => {
					responseBody += chunk;
				});
				response.on("end", () => {
					resolve(JSON.parse(responseBody).bills);
				});
			}
		);
		request.on("error", (err) => {
			console.log("ERROR: ", err);
		});
		request.write(data);
		request.end();
	});
	return await getUserEnergyBill.then(meterId);
}

exports.getEnergyBill = async function getForms() {
	const uid = await getUID();
	const referal = await getReferralCode(uid);
	const meterId = await getUserMeterId(referal);
	const userMeter = await activateUserMeter(meterId);
	const meterStatus = await getUserMeterStatus(meterId.toString());
	const energyBill = await getUserEnergyBill(meterId.toString());

	return energyBill;
};

exports.createForms = async (req, res) => {
	// Validate Request
	if (!req?.body) {
		res.status(400).send({
			message: "Content Can't Be Empty!",
		});
	}

	const resArr = [];
	const addr = [];
	const uid = await getUID();
	const referal = await getReferralCode(uid);
	console.log("test", referal);
	const meterId = await getUserMeterId(referal);
	console.log("meter final", meterId);
	const userMeter = await activateUserMeter(meterId);
	console.log("user meter", userMeter);
	resArr.push({ userMeter: userMeter });
	const meterStatus = await getUserMeterStatus(meterId.toString());
	console.log("meter Status", meterStatus);
	resArr.push({ "meter Status": meterStatus });
	const meterStatus2 = await getUserMeterStatus(meterId.toString());
	console.log("meter Status2", meterStatus2);
	resArr.push({ "meter Status2": meterStatus2 });
	const energyBill = await getUserEnergyBill(meterId.toString());
	console.log("Energy Bill", energyBill);
	resArr.push({ "energy bill": energyBill });
	addr.push({
		userId: uid,
		referalCode: referal,
		meterId: meterId,
		userMeter: userMeter,
		meterStatus: meterStatus,
		energyBill: energyBill,
	});
	res.send(addr);
};
