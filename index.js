// Data
let firstOperand = NaN;
let secondOperand = NaN;
let computedVal = NaN;
let alreadyFloat = false; // For float values, this will prevent the user from typing multiple dots into a single number
let displayVal = ""; // This is what the user sees, it is used to send information to the user and get info from them

// Functions
// Operation functions
function operate() {
    if (displayVal.length < 2) {
        return;
    }
    
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

    operatorIndex = 0;
    let cumulativeValue = operandArrayAddSub[0];
    for (let i = 1; i < operandArrayAddSub.length; i++) {
        let tor = operatorArrayAddSub[operatorIndex];
        if (tor == "+") {
            cumulativeValue = add(cumulativeValue, operandArrayAddSub[i]);
        } else {
            cumulativeValue = sub(cumulativeValue, operandArrayAddSub[i]);
        }
        operatorIndex++;
    }

    displayVal = cumulativeValue;
    display.textContent = displayVal;
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
    return Number(a) + Number(b);
}

function sub(a, b) {
    return Number(a) - Number(b);
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

// Event functionality
// Number buttons and operator buttons are separated so the operator buttons can check to make sure 2 aren't in a row
let lastBtnWasOperator = true; // Starts as true so the first user input can't be an operator
let equalWasLastClick = true; // Flag for if = was the last input from the user, display updating depends on this flag
const display = document.querySelector(".display-container");

const numberBtnList = document.querySelectorAll(".number-pad .pad-button");
numberBtnList.forEach((btn) => {
    if (btn.textContent != "=" && btn.textContent != ".") { // The equal and dot buttons have special functionality defined later
        btn.addEventListener("click", () => {
            updateDisplay(btn.textContent, false);
        });
    }
});

const operatorBtnList = document.querySelectorAll(".operator-pad .pad-button");
operatorBtnList.forEach((btn) => {
    btn.addEventListener("click", () => {
        updateDisplay(btn.textContent, true);       
    });
});

const equalBtn = document.querySelector("#equal-btn");
equalBtn.addEventListener("click", () => {
    if (!equalWasLastClick) {
        equalWasLastClick = true;
        operate();
    }
});

const dotBtn = document.querySelector("#dot-btn");
dotBtn.addEventListener("click", () => {
    // Check to see if the current number within the display already has a dot in it; if so, don't place a dot
    let validPlacement = true;

    // If a . is found before an operator then adding another . is invalid
    // When an operator or . is found leave the loop as only the last number needs to be checked, not the whole string
    theLoop: for (let i = -1; i*-1 < displayVal.length; i--) { // ! This checks the string in reverse order
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
        updateDisplay(dotBtn.textContent, false);
    }
});

function updateDisplay(btnContent, isOperator) {
    let validInput = true;

    if (isOperator) {
        if (!lastBtnWasOperator) {
            lastBtnWasOperator = true;
        } else {
            validInput = false;
        }
    } else {
        if(equalWasLastClick) {
            displayVal = "";
        }
        lastBtnWasOperator = false;
    }

    if (validInput) {
        displayVal += btnContent;
        display.textContent = displayVal;
        equalWasLastClick = false;
    }
}