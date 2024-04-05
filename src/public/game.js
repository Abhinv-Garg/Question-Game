document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startGame');
    const questionDiv = document.getElementById('question');
    const answersDiv = document.getElementById('answers');
    const timerDiv = document.getElementById('timer');
    const home = document.getElementById('home');
    const restartButton = document.getElementById('restartGame'); // Define restartButton

    let correctyansweredQuestions = 0;

    let timer; // Variable to store the timer interval
    let questionCount = 0; // Variable to track the number of questions asked
    const askedQuestions = []; // Array to store already asked questions

    home.addEventListener('click', () => {
        window.location.reload();
    });


    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);

    restartButton.style.display = 'none';
    home.style.display = 'none';



    function startGame() {

        startButton.style.display = 'none';
        restartButton.style.display = 'inline';
        home.style.display = 'inline';

        correctyansweredQuestions = 0;
        questionCount = 0; // Reset question count
        askedQuestions.length = 0; // Clear asked questions array
        clearInterval(timer);
        nextQuestion();
    }

    function nextQuestion() {
        // Check if the maximum number of questions has been reached
        if (questionCount >= 10) {
            displayGameResult(); // Display game result when 10 questions have been asked
            return;
        }

        // Fetch game data from the server
        fetch('http://localhost:3000/game/start-game')
            .then(response => response.json())
            .then(data => {
                const uniqueQuestion = getUniqueQuestion(data);
                renderQuestion(uniqueQuestion);
                startTimer(); // Start the timer for the current question
            })
            .catch(error => console.error('Error starting game:', error));
    }

    function getUniqueQuestion(data) {
        // Filter out questions that have already been asked
        const uniqueQuestions = data.filter(question => !askedQuestions.includes(question.question));
        if (uniqueQuestions.length === 0) {
            // If all questions have been asked, reset asked questions array
            askedQuestions.length = 0;
        }
        // Select a random question from the unique questions array
        const randomIndex = Math.floor(Math.random() * uniqueQuestions.length);
        const selectedQuestion = uniqueQuestions[randomIndex];
        // Add the selected question to the asked questions array
        askedQuestions.push(selectedQuestion.question);
        questionCount++;
        return selectedQuestion;
    }

    function renderQuestion(questionData) {
        questionDiv.textContent = questionData.question;

        // Clear previous answer buttons
        answersDiv.innerHTML = '';

        questionData.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.addEventListener('click', () => checkAnswer(answer, questionData.correctAnswer));
            answersDiv.appendChild(button);
        });
    }

    function startTimer() {
        let timeLeft = 30; // 30 seconds timer
        timerDiv.textContent = `Time left: ${timeLeft} seconds`;

        timer = setInterval(() => {
            timeLeft--;
            if (timeLeft >= 0) {
                timerDiv.textContent = `Time left: ${timeLeft} seconds`;
            } else {
                clearInterval(timer);
                timerDiv.textContent = 'Time\'s up!';
                checkAnswer('', ''); // Check answer with empty selected answer (indicating time's up)
            }
        }, 1000);
    }

    function checkAnswer(selectedAnswer, correctAnswer) {
        clearInterval(timer);
        let resultMessage;
        if (selectedAnswer === correctAnswer) {
            resultMessage = 'Correct!';
            correctyansweredQuestions++;
        } else {
            resultMessage = 'Incorrect!';
        }

        // Display result message
        const resultDiv = document.createElement('div');
        resultDiv.textContent = resultMessage;
        answersDiv.appendChild(resultDiv);

        // Remove the result message after a short delay
        setTimeout(() => {
            resultDiv.remove();
            // Render the next question
            nextQuestion();
        }, 2000);
    }

    function displayGameResult() {
        // Clear question and answer sections
        questionDiv.textContent = '';
        answersDiv.innerHTML = '';

        // Calculate and display game result
        const score = questionCount;
        const correctAnswers = score;
        const resultMessage = `Game Over! You answered ${correctyansweredQuestions} questions correctly out of 10.`;
        questionDiv.textContent = resultMessage;

        // Show restart button
        restartButton.style.display = 'block';
    }

});

// document.addEventListener('DOMContentLoaded', () => {
//     // Fetch the user's name from the server
//     fetch('/user')
//         .then(response => response.json())
//         .then(data => {
//             const userName = data.name;
//             const userNameElement = document.getElementById('userName');
//             userNameElement.textContent = userName;
//         })
//         .catch(error => console.error('Error fetching user data:', error));
// });
