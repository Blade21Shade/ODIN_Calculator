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
// Number buttons and operator buttons are separated so the operator buttons can check to make sure 2 aren't in a row
let lastBtnWasOperator = true; // Starts as true so the first user input can't be an operator
const display = document.querySelector(".display-container");

const numberBtnList = document.querySelectorAll(".number-pad .pad-button");
numberBtnList.forEach((btn) => {
    if (btn.textContent != "=" && btn.textContent != ".") { // The equal and dot buttons have special functionality defined later
        btn.addEventListener("click", () => {
        displayVal += btn.textContent;
        display.textContent = displayVal;
        lastBtnWasOperator = false;
    });
    }
});

const operatorBtnList = document.querySelectorAll(".operator-pad .pad-button");
operatorBtnList.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (!lastBtnWasOperator) {
            displayVal += btn.textContent;
            display.textContent = displayVal;
            lastBtnWasOperator = true;
        }        
    })
});

const equalBtn = document.querySelector("#equal-btn");
equalBtn.addEventListener("click", () => {
    let validVal = parseDisplayVal();
    if (validVal) {
        operate();
    }
});

const dotBtn = document.querySelector("#dot-btn");
dotBtn.addEventListener("click", () => {
    // Check to see if the current number within the display already has a dot in it; if so, don't place a dot
    let validPlacement = true;

    // If a . is found before an operator then adding another . is invalid
    // When an operator or . is found leave the loop as only the last number needs to be checked, not the whole string
    theLoop: for (let i = -1; i*-1 < displayVal.length; i--) {
        switch(displayVal.at(i)) {
            case "+":
            case "-":
            case "*":
            case "/":
                break theLoop;
            case ".":
                validPlacement = false;
                break theLoop;
        }
    }

    if (validPlacement) {
        displayVal += dotBtn.textContent;
        display.textContent = displayVal;
        lastBtnWasOperator = false;
    }
});