let scoreListDivEl = document.querySelector("#score-list-div");
var scoreListEl;
let userObjArr = [];

//if a score gets deleted update the score object and reload

let updateScores = function(){
    let newObjArray = document.querySelectorAll("li");
    let tempArray = [];
    for (let i = 0 ; i < newObjArray.length ; i++) {
        let tempObjArray = [];
        let tempVal = newObjArray[i].innerText.replace("Delete", "");
        console.log(tempVal);
        tempObjArray = tempVal.split(" score: ");
        console.log(tempObjArray);
        var newUserList = {
            name: tempObjArray[0],
            score: tempObjArray[1].replace("\n", "")
        };
        console.log(newUserList);
        tempArray.push(newUserList);
    }
    userObjArr = tempArray;
    localStorage.setItem("score", JSON.stringify(userObjArr));
    location.reload();
};

// load the scores from the score object

let loadScores = function() {
    let savedScores = localStorage.getItem("score");
    console.log(savedScores);
    if (!savedScores) {
        return false;
    } else {
        console.log("here");
        let scoreListEl = document.createElement("ol");
        scoreListEl.id = "score-list";
        scoreListDivEl.appendChild(scoreListEl);
        userObjArr = JSON.parse(savedScores);
        for (let i = 0; i < userObjArr.length; i++) {
            let scoreItemEl = document.createElement("li");
            // alternate colors based on index
            if ((i % 2) !== 0) {
                scoreItemEl.className = "score-item2";
            } else {
                scoreItemEl.className = "score-item1";
            }
            // put in delete button and program it in reference to the element
            scoreItemEl.innerHTML = userObjArr[i].name + " score: " + userObjArr[i].score + "<button class='delete-btn'>Delete</button>";
            let deletButtonEl = scoreItemEl.querySelector(".delete-btn");
            deletButtonEl.addEventListener("click", function (){
                scoreItemEl.remove();
                updateScores();
            });
            scoreListEl.appendChild(scoreItemEl);
        }
        
    } 
};

loadScores();

// if no scores display text

if (!userObjArr[0]){
    // will allow a deleted list to show the same text
    let isListEmptied = document.querySelector("#score-list");
    if (isListEmptied){
        isListEmptied.remove();
    }

    let noScoresTextEl = document.createElement("h2");
    noScoresTextEl.textContent = "No High Scores To Show";
    scoreListDivEl.appendChild(noScoresTextEl);
}

