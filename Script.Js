let firstNumber = 0;
let operator = "";
let secondNumber = 0;
let isTurnedOn = false;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, operation) {
    return operation(num1, num2);
}

let clickedButton = document.querySelector(".on-button");

clickedButton.addEventListener("click", () => {
    document.querySelector(".calculator-indicator-light").classList.toggle("calculator-on");
    
    if (isTurnedOn == true) {
        isTurnedOn = false;
    }
    else if (isTurnedOn == false) {
        isTurnedOn = true;
    }
    console.log(isTurnedOn);
});
