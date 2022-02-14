let topText = document.querySelector("#main-header");
let startBtn = document.querySelector("#start-btn");
let mainContainer = document.querySelector("#quiz-container");
let questionId = 0;
let timerValue = document.getElementById("timer-value");
var timeInterval;
const highScores = [];

// quiz questions in an array of objects

const quizQuestions = [
    {
        question: "What is 'i' in the following declaration?\n 'array[i]'",
        answers: "the index value<>an internal reference to itself<>the start of a for-loop<>nothing",
        correct: "the index value"
    },
    {
        question: "What is a for-loop's normal syntax",
        answers: "for ( i = 0 ; i < array.length; i++){}<>for ( var i = 0 ; i < array.length; i++){}<>for ( i++ ){}<>for(){}",
        correct: "for ( var i = 0 ; i < array.length; i++){}"
    },
    {
        question: "What does a while loop do?",
        answers: "answers questions while you wait<>works while the declaration is false<>works while a declaration is true<>runs a function indefinitely",
        correct: "works while a declaration is true"
    },
    {
        question: "How can you declare a variable?",
        answers: "var i =<>let i =<>const i =<>all of these",
        correct: "all of these"
    },
    {
        question: "How do you store an item to localStorage?",
        answers: "localStorage.setItem(var)<>localStorage.setItem('key', 'value')<>setItem.localStorage(var)<>setItem.localStorage('key', 'value')",
        correct: "localStorage.setItem('key', 'value')"
    }
];

// set up high score saving
let userObjArr = [];

let saveScore = function() {
    localStorage.setItem("score", JSON.stringify(userObjArr));
};

// set up high score loading

let loadScores = function() {
    let savedScores = localStorage.getItem("score");
    if (!savedScores) {
        return false;
    } else {
        userObjArr = JSON.parse(savedScores);
    } 
};

// Game Over

let gameOver = function(score) {
    // generate the game over screen
    mainContainer.remove();
    let mainScoreContEl = document.createElement("main");
    mainScoreContEl.className = "game-over-cont";
    document.body.appendChild(mainScoreContEl);
    let scoreFormEl = document.createElement("form");
    mainScoreContEl.appendChild(scoreFormEl);
    let scoreFormLabelEl = document.createElement("label");
    scoreFormLabelEl.setAttribute("for", "name");
    scoreFormLabelEl.textContent = "Score: " + score;
    scoreFormEl.appendChild(scoreFormLabelEl);
    let scoreFormInputEl = document.createElement("input");
    scoreFormInputEl.type = "text";
    scoreFormInputEl.className = "form-input"
    scoreFormInputEl.name = "name";
    scoreFormInputEl.id = "name";
    scoreFormInputEl.setAttribute("placeholder", "Your initials");
    scoreFormEl.appendChild(scoreFormInputEl);
    let scoreFormButtonEl = document.createElement("button");
    scoreFormButtonEl.className = "submit-btn";
    scoreFormButtonEl.id = "submit-hs";
    scoreFormButtonEl.textContent = "Submit Score";
    scoreFormEl.appendChild(scoreFormButtonEl);

    // once button is pushed save the score to localstorage, then change the form to try again

    scoreFormButtonEl.addEventListener("click", function(event){
        event.preventDefault();
        let userName = scoreFormInputEl.value.trim();
        var user = {
            name: userName.substring(0, 3),
            score: score
        };
        loadScores();
        userObjArr.push(user);
        saveScore();
        let retryBtnEl = document.createElement("button");
        scoreFormInputEl.readOnly = true;
        retryBtnEl.textContent = "Try Again?";
        retryBtnEl.className = "submit-btn";
        retryBtnEl.addEventListener("click", function(event){
            location.reload();
        });
        scoreFormEl.appendChild(retryBtnEl);
        scoreFormButtonEl.remove();
    });
};

// Timer function

let countDown = function(timePenalty) {
    let currTime = timerValue.textContent;
    let timeLeft = currTime - timePenalty;
    if (timeLeft > 0){
        timerValue.textContent = timeLeft;
        timeLeft--;
        }
    timeInterval = setInterval(function() {
        if (timeLeft > 0){
        timerValue.textContent = timeLeft;
        timeLeft--;
        } else {
            timerValue.textContent = "TIMES UP!"
            clearInterval(timeInterval);
            gameOver(0);
        }
    },1000);
};

// add randomness to arrays

function randomIze(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

//dynamically create questions based on the array quizQuestions and put answers in a form

var quizHandler = function() {
    
    // this will only ever be called once at the start of the quiz so it's the best place to start the timer
    let introText = document.querySelector("#quiz-start-cont");
    if (introText){
        introText.remove();
        randomIze(quizQuestions);
        countDown(0);
    }
    // Looks to see if there is already a defined question and answer set
    let answerContainer = document.querySelector("#quiz-answers-cont");
    let questionForm = quizQuestions[questionId];
    if (questionForm) {
        // takes the answers from the array object and splits it into a new array to form the answer choices
        let allAnswersList = questionForm.answers.split("<>");
        randomIze(allAnswersList);
        if (!answerContainer) {
            let answerContainerEl = document.createElement("div");
            let answerListEl = document.createElement("ul");
            topText.textContent = questionForm.question;
            answerContainerEl.className = "quiz-answers-cont";
            answerContainerEl.id = "quiz-answers-cont";
            answerListEl.className = "quiz-answers-list";
            answerListEl.id = "quiz-answers-list";
            answerContainerEl.appendChild(answerListEl);
            mainContainer.appendChild(answerContainerEl);
            for (let i = 0 ; i < allAnswersList.length; i++) {
                let answerItemEl = document.createElement("li");
                answerItemEl.innerHTML = "<button class='btn'>" + (i + 1)  + ") " + allAnswersList[i] + "</button>";
                answerItemEl.addEventListener("click", function() {
                    let resultTextEl = document.querySelector("#result-text");
                    if (!resultTextEl){
                        let answerResult = document.createElement("p");
                            answerResult.className = "result-text";
                            answerResult.id = "result-text";
                        if (allAnswersList[i] === questionForm.correct) {
                            answerResult.textContent = "Correct!";
                            questionId++;
                            quizHandler();
                        } else {
                            answerResult.textContent = "Incorrect";
                            clearInterval(timeInterval);
                            countDown(10);
                        }
                        answerContainerEl.appendChild(answerResult);
                    } else {
                        if (allAnswersList[i] === questionForm.correct) {                    
                            resultTextEl.textContent = "Correct!";
                            questionId++;
                            quizHandler();
                        } else {
                            resultTextEl.textContent = "Incorrect";
                            clearInterval(timeInterval);
                            countDown(10);
                        }
                    }
                });
                answerListEl.appendChild(answerItemEl);
            }
            // If there is a question and answer set already up this will remove it and build the new question and answer set
        } else {
            answerContainer.remove();
            quizHandler();
        }
        // what to do when there are no more questions in the array
    } else {
        let score = timerValue.textContent;
        clearInterval(timeInterval);
        gameOver(score);
    }
};



startBtn.addEventListener("click", quizHandler);
