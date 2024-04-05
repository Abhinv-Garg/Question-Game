const express = require("express");
const AppController = require("../controllers/app.controller");
const path = require("path");

//Setting up the Express Router
const Router = express.Router();

//Setting up Routes
// Router.use("/", AppController)
Router.get("/", AppController);
Router.get("/login", (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'Pages', 'login.html'));
});

module.exports = Router;