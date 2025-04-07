let boxes = document.querySelectorAll(".box");
let replay = document.querySelector(".restart");
let resetBtn = document.querySelector(".reset");
let upparMessage = document.querySelector(".uppar-model");
let winnerText = document.querySelector(".winner");

let turnO = true;
let count = 0;

// Possible winning patterns
let winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Fill the box with 'O' or 'X' alternatively

let clickSound = new Audio("tap.wav"); 

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        clickSound.play(); // Play sound on click

        if (turnO) {
            box.innerText = "O";
        } else {
            box.innerText = "X";
        }
        turnO = !turnO;
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});


const resetGame = () => {
    turnO = true;
    count = 0;
    enableButtons();
    upparMessage.classList.add("hide");
};

const enableButtons = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const disableButtons = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

const gameDraw = () => {
    winnerText.innerText = "Match was a Draw";
    upparMessage.classList.remove("hide");
    disableButtons();
};

const showWinner = (winner) => {
    winnerText.innerText = `Congratulations! Winner is ${winner}`;
    upparMessage.classList.remove("hide");
    disableButtons();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return true;
        }
    }
    return false;
};

// Event listeners for restart and reset buttons
replay.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

