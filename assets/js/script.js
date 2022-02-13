let topText = document.querySelector("#main-header");
let startBtn = document.querySelector("#start-btn");
let mainContainer = document.querySelector("#quiz-container");
let questionId = 0;
let timerValue = document.getElementById("timer-value");
var timeInterval;
//let testInterval = setInterval(countDown, 1000);

// quiz questions in an array of objects

const quizQuestions = [
    {
        question: "What is 1+1",
        answers: "2<>4<>6<>8",
        correct: "2"
    },
    {
        question: "what is 2+2",
        answers: "1<>4<>8<>10<>12",
        correct: "4"
    },
    {
        question: "what is 5+5",
        answers: "4<>8<>10<>12",
        correct: "10" 
    }
];

// Timer function

let countDown = function(currValue, timePenalty) {
    let timeLeft = currValue - timePenalty;
    timeInterval = setInterval(function() {
        if (timeLeft !== 0){
        timerValue.textContent = timeLeft;
        timeLeft--;
        } else {
            timerValue.textContent = "TIMES UP!"
            clearInterval(timeInterval);
        }
    },1000);
};

//dynamically create questions based on the array quizQuestions and put answers in a form

var quizHandler = function() {
    // this will only ever be called once at the start of the quiz so it's the best place to start the timer
    let introText = document.querySelector("#quiz-start-cont");
    if (introText){
        introText.remove();
        countDown(60, 0);
    }
    // Looks to see if there is already a defined question and answer set
    let answerContainer = document.querySelector("#quiz-answers-cont");
    let questionForm = quizQuestions[questionId];
    if (questionForm) {
        // takes the answers from the array object and splits it into a new array to form the answer choices
        let allAnswersList = questionForm.answers.split("<>");
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
                            let currTime = timerValue.textContent;
                            clearInterval(timeInterval);
                            countDown(currTime, 10);
                        }
                        answerContainerEl.appendChild(answerResult);
                    } else {
                        if (allAnswersList[i] === questionForm.correct) {                    
                            resultTextEl.textContent = "Correct!";
                            questionId++;
                            quizHandler();
                        } else {
                            resultTextEl.textContent = "Incorrect";
                            let currTime = timerValue.textContent;
                            clearInterval(timeInterval);
                            countDown(currTime, 10);
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
        console.log("can't do that");
    }
};

startBtn.addEventListener("click", quizHandler);
