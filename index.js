// Data
let firstOperand = NaN;
let secondOperand = NaN;
let computedVal = NaN;
let alreadyFloat = false; // For float values, this will prevent the user from typing multiple dots into a single number
let displayVal = ""; // This is what the user sees, it is used to send information to the user and get info from them

const Operations = Object.freeze({
    NOTSET: "NOTSET", // This is set when an operation finishes and used before the first run; it prevents chained operations from occurring
    ADD: "ADD",
    SUB: "SUB",
    MUL: "MUL",
    DIV: "DIV",
});

let currentOperation = Operations.NOTSET;

// Functions
// Operation functions
function operate() {
    switch(currentOperation) {
        case "ADD":
            add();    
            break;
        case "SUB":
            sub();
            break;
        case "MUL":
            mul();
            break;
        case "DIV":
            div();
            break;
        case "NOTSET":
            console.log("NOTSET called in operate: This shouldn't happen")
            break;
    }
}

function add() {
    computedVal = firstOperand + secondOperand;
}

function sub() {
    computedVal = firstOperand - secondOperand;
}

function mul() {
    computedVal = firstOperand * secondOperand;
}

function div() {
    if (secondOperand == 0) {
        alert("Cannot divide by 0")
        return;
    }
    computedVal = firstOperand / secondOperand;
}

// Setting functions
function setOperator(operator) {
    if (currentOperation !== "NOTSET") { // If this is in the middle of parsing the string any operators after the first are ignored
        return; // It may be better to call operate here instead, however in the case of two operators in a row without a second operand this could break
    }
    switch(operator) {
        case "+":
            currentOperation = Operations.ADD;
            break;
        case "-":
            currentOperation = Operations.SUB;
            break;
        case "*":
            currentOperation = Operations.MUL;
            break;
        case "/":
            currentOperation = Operations.DIV;
            break;
        default: 
            alert("Issue when setting operator")
            break;
    }
}

function setOperand(value, forFirstOperand) {
    if (forFirstOperand) {
        firstOperand = value;
    } else {
        secondOperand = value;
    }
}

// Event functionality
const btnList = document.querySelectorAll(".pad-button");
const display = document.querySelector(".display-container");
btnList.forEach((btn) => {
    btn.addEventListener("click", () => {
        displayVal += btn.textContent;
        display.textContent = displayVal;
    })
})