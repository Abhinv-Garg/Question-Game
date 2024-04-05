const AppService = require("../services/app.service");
const path = require("path");

const AppController =
  (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'Pages', 'registeration.html'));
  }


module.exports = AppController;
