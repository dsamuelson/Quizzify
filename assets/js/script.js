let topText = document.querySelector("#main-header");
let introText = document.querySelector("#quiz-start-cont");
let startBtn = document.querySelector("#start-btn");
let mainContainer = document.querySelector("#quiz-container");
let questionId = 0;

const quizQuestions = [
    {
        question: "What is 1+1",
        answer: "2>4>6>8",
        correct: "2"
    },
    {
        question: "what is 2+2",
        answer: "4>8>10>12",
        correct: "4"
    }
];

let answerHandler = function(valueR) {
    alert(valueR);

};

var quizHandler = function() {
    introText.remove();
    let answerContainer = document.createElement("div");
    let answerList = document.createElement("ul");
    topText.textContent = quizQuestions[questionId].question;
    let allAnswersList = quizQuestions[questionId].answer.split(">");
    answerContainer.className = "quiz-answers-cont";
    answerList.className = "quiz-answers-list";
    answerContainer.appendChild(answerList);
    mainContainer.appendChild(answerContainer);
    for (let i = 0 ; i < allAnswersList.length; i++) {
        let answerItem = document.createElement("li");
        answerItem.innerHTML = "<button class='btn'>" + (i + 1)  + ") " + allAnswersList[i] + "</button>";
        answerItem.addEventListener("click", function() {
            if (allAnswersList[i] === quizQuestions[iD].correct) {
                alert("correct");
            }
        });
        answerList.appendChild(answerItem);
    }
};

startBtn.addEventListener("click", quizHandler);
