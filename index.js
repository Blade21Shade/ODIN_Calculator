// Data
let firstOperand = 0;
let secondOperand = 0;
let computedVal = 0;

const Operations = Object.freeze({
    NOTSET: "NOTSET", // This is set when an operation finishes and used before the first run; it prevents chained operations from occurring
    ADD: "ADD",
    SUB: "SUB",
    MUL: "MUL",
    DIV: "DIV",
});

const currentOperation = Operations.NOTSET;

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
        return;
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