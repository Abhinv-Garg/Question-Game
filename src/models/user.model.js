const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please add the user name"]
    },
    lastName: {
        type: String,
        required: [true, "Please add the last name"]

    },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken"],
        // Basic email format validation
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    profilePicture: {
        type: String,
        required: false,
        default: ""
    },
    birthdate: {
        type: Date,
        required: [true, "Please add the birth date"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Please add the phone number"],
    },
    password: {
        type: String,
        required: [true, "Please add the user password"],
        minlength: 6 // Minimum length of password
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("User", userSchema);