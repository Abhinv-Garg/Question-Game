const express = require("express");
const { registerUser, currentUser, loginUser } = require("../controllers/user.controller");
const validateToken = require("../middleware/validateTokenHandler");

//Setting up the Express Router
const Router = express.Router();

//Setting up Routes
Router.post("/register", registerUser);

Router.post("/login", loginUser);

Router.get("/current", validateToken, currentUser);


module.exports = Router;