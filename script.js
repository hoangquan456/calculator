let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;
let num = 0;
// let secondNumber = NaN;
let lastOp = ""; 
let newInput = false;
let haveDecimal = false;
let operationClicked = false;

function operate(a, b, op) {
    a = +a;
    b = +b;
    if (op == "+") return a + b;
    if (op == "-") return a - b;
    if (op == "*") return a * b; 
    if (op == "/") return a / b; 
}

function modifyDisplay(char) { //we want to add char to display
    if (char == ".") {
        if (haveDecimal) return;
        haveDecimal = true;
    }
    if (newInput) {
        display.textContent = ""; 
        newInput = false;
    }
    display.textContent += char;
    if (display.textContent.length > 9) {
        display.textContent = +(+display.textContent).toFixed(8);
    }
    while(display.textContent.charAt(0) == "0" && display.textContent.length > 1 && display.textContent.charAt(1) == "0") {
        display.textContent = display.textContent.slice(1);
    }
}

let digitClicked = -1; 
for(let i = 0; i <= 9; ++i) {
    let btn = document.getElementById(`digit-${i}`);
    btn.addEventListener( "click", ()=> {
        modifyDisplay(i);
        operationClicked = false;
    });
}

let display = document.getElementById("display"); 
let clear = document.getElementById("clear"); 
clear.addEventListener("click", ()=>{
    display.textContent = "";
    lastOp = "";
    newInput = false;
    haveDecimal = false;
    num = 0;
    operationClicked = false;
});

let operations = [...document.querySelectorAll(".operation")];
for(let operation of operations) {
    operation.addEventListener( "click", ()=>{
        if (!operationClicked) {
            if (lastOp == "") {
                num = +display.textContent; 
            }
            else {
                num = operate(num, display.textContent, lastOp);
                newInput = true;
                modifyDisplay(num, newInput);
            }
        }
        operationClicked = true;
        newInput = true;
        lastOp = operation.textContent;
        haveDecimal = false; 
    })
}

let decimal = document.getElementById("decimal");
decimal.addEventListener("click", ()=>{
    modifyDisplay(".");
})

let equal = document.getElementById("equal"); 
equal.addEventListener("click", ()=>{
    if (lastOp != "") {
        if (!operationClicked) {
            num = operate(num, display.textContent, lastOp);
            newInput = true;
            modifyDisplay(num);
        }
        lastOp = ""; 
        newInput = true;
        haveDecimal = false;
        operationClicked = false;
    }
});