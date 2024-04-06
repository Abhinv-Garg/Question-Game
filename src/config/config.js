const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: 3000,
  MONGODB_URL: process.env.MONGODB_URL,
};
