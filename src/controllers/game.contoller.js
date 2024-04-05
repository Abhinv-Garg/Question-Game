const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Function to shuffle array elements
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const startGame = asyncHandler(async (req, res) => {
    // Define game data (questions, answers)
    const gameData = [
        { question: '2 + 3', answers: ['4', '5', '6', '7'], correctAnswer: '5' },
        { question: '8 - 4', answers: ['2', '4', '6', '8'], correctAnswer: '4' },
        { question: '2 * 4', answers: ['2', '4', '6', '8'], correctAnswer: '8' },
        { question: '12 * 2', answers: ['2', '24', '6', '8'], correctAnswer: '24' },
        { question: '16 * 2', answers: ['32', '44', '36', '78'], correctAnswer: '32' },
        { question: '8 / 4', answers: ['2', '4', '6', '8'], correctAnswer: '2' },
        { question: '60 / 4', answers: ['18', '15', '45', '32'], correctAnswer: '15' },
        { question: '15 - 5', answers: ['10', '4', '6', '8'], correctAnswer: '10' },
        { question: '9 + 4', answers: ['13', '14', '16', '18'], correctAnswer: '13' },
        { question: '18 - 8', answers: ['12', '10', '6', '8'], correctAnswer: '10' },
        { question: '32 / 2', answers: ['12', '14', '16', '8'], correctAnswer: '16' },
        // Add more questions here
    ];

    // Shuffle the game data to randomize the order of questions
    const shuffledGameData = shuffleArray(gameData);
    res.json(shuffledGameData);
});



module.exports = { startGame }
