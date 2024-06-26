const express = require("express");
const { registerUser, currentUser, loginUser } = require("../controllers/user.controller");
const { startGame } = require("../controllers/game.contoller");
const validateToken = require("../middleware/validateTokenHandler");

//Setting up the Express Router
const Router = express.Router();

//Setting up Routes

Router.get("/game-home", (req, res) => {
    res.render("game");
});
Router.get("/start-game", startGame);



module.exports = Router;