// Data the calculator will use to conduct operations
let firstVal = 0;
let secondVal = 0;
let computedVal = 0;

const Operations = Object.freeze({
    ADD: "add",
    SUB: "sub",
    MUL: "mul",
    DIV: "div",
});

let currentOperation = Operations.ADD;