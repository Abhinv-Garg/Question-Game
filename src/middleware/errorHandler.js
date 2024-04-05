const { constants } = require("../constants");

const erroHandler = (err, req, res, next) => {

    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Failed", message: err.message, stackTrace: err.stack });
            break;

        case constants.NOT_FOUND:
            res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
            break;

        case constants.UNAUTHERIZED:
            res.json({ title: "unautherized", message: err.message, stackTrace: err.stack });
            break;

        case constants.FORBIDDEN:
            res.json({ title: "forbidden", message: err.message, stackTrace: err.stack });
            break;

        default:
            console.log("No error, All Good!");
            break;
    }

};

module.exports = erroHandler;