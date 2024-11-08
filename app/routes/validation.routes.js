module.exports = (app) => {
  const user = require("../validation/user.validation.js");

  var router = require("express").Router();

  // Validate all User Data
  router.use("/userData", user.validateUserData);

  // Validate User Email
  router.use("/email", user.validateUserEmail);

  // Validate User Password
  router.use("/password", user.validateUserPassword);

  app.use("/validate", router);
};
