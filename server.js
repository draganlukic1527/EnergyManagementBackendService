const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to solnook application." });
});

require("./app/routes/user.routes.js")(app);
require("./app/routes/login.routes.js")(app);
require("./app/routes/utilityAPI.routes.js")(app);
require("./app/routes/validation.routes.js")(app);

// set port, listen for requests
const NODE_ENV = process.env.NODE_ENV || "local";
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || process.env.NODE_DOCKER_PORT || 8080;

app.listen(PORT, HOST, () => {
  console.log(
    `Server is running on port ${PORT}. and host ${HOST} and env ${NODE_ENV}`
  );
});
