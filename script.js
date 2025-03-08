let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;
let num = NaN;
// let secondNumber = NaN;
let lastOp = ""; 
let newInput = false;

function operate(a, b, op) {
    a = +a;
    b = +b;
    if (op == "+") return a + b;
    if (op == "-") return a - b;
    if (op == "*") return a * b; 
    if (op == "/") return a / b; 
}

function modifyDisplay(char) { //we want to add char to display
    display.textContent += char;
}

let digitClicked = -1; 
for(let i = 0; i <= 9; ++i) {
    let btn = document.getElementById(`digit-${i}`);
    btn.addEventListener( "click", ()=> {
        if (newInput) {
            display.textContent = ""; 
            newInput = false;
        }
        display.textContent += i; 
    });
}

let display = document.getElementById("display"); 
let clear = document.getElementById("clear"); 
clear.addEventListener("click", ()=>{
    display.textContent = "";
});

let operations = [...document.querySelectorAll(".operation")];
for(let operation of operations) {
    operation.addEventListener( "click", ()=>{
        if (Number.isNaN(num)) {
            num = +display.textContent; 
        }
        else {
            num = operate(num, display.textContent, lastOp);
            display.textContent = num;
        }
        newInput = true;
        lastOp = operation.textContent; 
    })
}