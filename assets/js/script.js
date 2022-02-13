let topText = document.querySelector("#main-header");
let startBtn = document.querySelector("#start-btn");
let mainContainer = document.querySelector("#quiz-container");
let questionId = 0;
let timerValue = document.getElementById("timer-value");

const quizQuestions = [
    {
        question: "What is 1+1",
        answers: "2>4>6>8",
        correct: "2"
    },
    {
        question: "what is 2+2",
        answers: "4>8>10>12",
        correct: "4"
    },
    {
        question: "what is 5+5",
        answers: "4>8>10>12",
        correct: "10" 
    }
];

function countDown() {
    let timeLeft = 60;
    var timeInterval = setInterval(function (){
        if (timeLeft !== 0){
        timerValue.textContent = timeLeft;
        timeLeft--;
        } else {
            timerValue.textContent = "TIMES UP!"
            clearInterval(timeInterval);
        }
    },1000);
};

var quizHandler = function() {
    let introText = document.querySelector("#quiz-start-cont");
    if (introText){
        introText.remove();
        countDown();
    }
    let answerContainer = document.querySelector("#quiz-answers-cont");
    let questionForm = quizQuestions[questionId];
    if (questionForm) {
        let allAnswersList = questionForm.answers.split(">");
        if (!answerContainer) {
            let answerContainerEl = document.createElement("div");
            let answerListEl = document.createElement("ul");
            topText.textContent = quizQuestions[questionId].question;
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
                        if (allAnswersList[i] === quizQuestions[questionId].correct) {
                            answerResult.textContent = "Correct!";
                            questionId++;
                            quizHandler();
                        } else {
                            answerResult.textContent = "Incorrect";
                        }
                        answerContainerEl.appendChild(answerResult);
                    } else {
                        if (allAnswersList[i] === quizQuestions[questionId].correct) {                    
                            resultTextEl.textContent = "Correct!";
                            questionId++;
                            quizHandler();
                        } else {
                            resultTextEl.textContent = "Incorrect";
                        }
                    }
                });
                answerListEl.appendChild(answerItemEl);
            }
        } else {
            answerContainer.remove();
            quizHandler();
        }
    } else {
        console.log("can't do that");
    }
};

startBtn.addEventListener("click", quizHandler);
