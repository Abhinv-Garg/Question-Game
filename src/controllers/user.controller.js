const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

// @desc Register the user
// @route POST users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, profilePicture, birthdate, phoneNumber, password } = req.body;

    if (!firstName || !lastName || !email || !birthdate || !phoneNumber) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
        throw new Error("User already registered");
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    const user = await User.create({
        firstName,
        lastName,
        email,
        profilePicture,
        birthdate,
        phoneNumber,
        password: hashedPassword
    });

    console.log(`User Created ${user}`);

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400);
        throw new Error("User data was not valid");
    }

    res.sendFile(path.join(__dirname, '..', 'Pages', 'login.html'));
    res.json({ message: "User Registered!" });
});

// @desc Login the user
// @route POST users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    firstName: user.firstName,
                    email: user.email,
                    id: user.id
                }
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60m" }
        )

        // res.sendFile(path.join(__dirname, '..', 'Pages', 'game.html'));

        res.status(200).json({ accessToken })
    } else {
        res.status(401);
        throw new Error("email or password is not valid!");
    }

    // res.json({ message: "User logged in" });
});

// @desc Get Current user
// @route POST users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };