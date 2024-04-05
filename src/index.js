//Import Required Packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/config");
const erroHandler = require("./middleware/errorHandler");
const path = require("path");


//Setting up express
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(erroHandler);

//Setting up Mongoose
mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/Pages'); // Optional: set the views directory

app.use(express.static(path.join(__dirname, 'public')));


//Routes
const appRoutes = require("./routes/app.route");
app.use("/", appRoutes);

const userRoutes = require("./routes/user.route");
app.use("/users", userRoutes);

const gameRoutes = require("./routes/game.route");
app.use("/game", gameRoutes);

//Server Listening
app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`);
});

//Export Server
module.exports = app;
