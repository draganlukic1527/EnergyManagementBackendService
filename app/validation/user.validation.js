const validateUserData = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (!req.body.EmailAddress) {
    throw Error("Email is required");
  }

  // Check valid Email
  const validEmailRegex =
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  const isValidEmail = req.body.EmailAddress.match(validEmailRegex);
  if (!isValidEmail) {
    return res.status(400).send({
      message: "Invalid Email",
    });
  }

  if (!req.body.PasswordHash) {
    return res.status(400).send({
      message: "Password is required",
    });
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
  console.log("CHECK: ", req.body.EmailAddress);
  return res.res.send(JSON.stringify({ EmailAddress: req.body.EmailAddress }));
};

const validateUserEmail = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (!req.body.EmailAddress) {
    return res.status(400).send({
      message: "Email is required",
    });
  }

  // Check valid Email
  const validEmailRegex =
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  const isValidEmail = req.body.EmailAddress.match(validEmailRegex);
  if (!isValidEmail) {
    return res.status(400).send({
      message: "Invalid Email",
    });
  }
  console.log("CHECK: ", req.body.EmailAddress);
  res.send(JSON.parse(JSON.stringify({ EmailAddress: req.body.EmailAddress })));
};

const validateUserPassword = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (!req.body.PasswordHash) {
    return res.status(400).send({
      message: "Password is required",
    });
  }

  const validPasswordRegex =
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  const isValidPassword = req.body.PasswordHash.match(validPasswordRegex);
  if (!isValidPassword) {
    res.status(400).send({
      message:
        "Invalid Password (Please include an upper case character, lower case character, 8 characters long, number, and special character)",
    });
  }
  console.log("CHECK PASS: ", req.body.PasswordHash);
  res.send(JSON.parse(JSON.stringify({ PasswordHash: req.body.PasswordHash })));
};

module.exports = { validateUserData, validateUserEmail, validateUserPassword };
