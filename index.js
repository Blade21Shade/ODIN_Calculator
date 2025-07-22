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
    // Make arrays for the operators and operands, then go through them doing math as needed, finally return the result
    const operandArray = [];
    const operatorArray = [];
    fillEquationArrays(operandArray, operatorArray);

    // Since multiplication and division are done first I need to separate the addition and subtraction operands and operators  
    const operandArrayAddSub = [];
    const operatorArrayAddSub = [];
    
    let operandIndex = 0;
    let operatorIndex = 0;

    // Do all * and /, push + and - for later
    while (true) {
        if (operatorIndex == operandArray.length - 1) {
            operandArrayAddSub.push(operandArray[operandIndex]); // This value would be skipped if the loop just broke, so push it
            break;
        }
        
        let and1 = operandArray[operandIndex];
        let and2 = operandArray[operandIndex+1];
        let tor = operatorArray[operatorIndex];
        
        let temp = 0;
        switch(tor) {
            case "+":
            case "-":
                operandArrayAddSub.push(and1);
                operatorArrayAddSub.push(tor);
                break;
            case "*":
                temp = mul(and1, and2);
                // Temp is used again if the next operator is * or /, or is appended if that operator is + or -
                operandArray[operatorIndex+1] = temp; 
                break;
            case "/":
                temp = div(and1, and2);
                // Temp is used again if the next operator is * or /, or is appended if that operator is + or -
                operandArray[operatorIndex+1] = temp;
                break;
        }
        operandIndex++;
        operatorIndex++;
    }

    // switch(currentOperation) {
    //     case "ADD":
    //         add();    
    //         break;
    //     case "SUB":
    //         sub();
    //         break;
    //     case "MUL":
    //         mul();
    //         break;
    //     case "DIV":
    //         div();
    //         break;
    //     case "NOTSET":
    //         console.log("NOTSET called in operate: This shouldn't happen")
    //         break;
    // }
}

function fillEquationArrays(operandArray, operatorArray) {
    // Parse the displayVal and fill in the arrays with values from it
    let temp = "";
    for (let i = 0; i < displayVal.length; i++) {
        switch(displayVal[i]) {
            case "+":
            case "-":
            case "*":
            case "/":
                operatorArray.push(displayVal[i]);
                operandArray.push(temp);
                temp = "";
                break;
            default:
                temp += displayVal[i];
                break;
        }
    }
    // If anything is left in temp, push it onto the operandArray, if not there is an extra operand so it needs to be removed
    if (temp !== "") {
        operandArray.push(temp);
    } else {
        operatorArray.pop();
    }
    
}

function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mul(a, b) {
    return a * b;
}

function div(a, b) {
    if (secondOperand == 0) {
        alert("Cannot divide by 0")
        return NaN;
    }
    return a / b;
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
    operate();
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