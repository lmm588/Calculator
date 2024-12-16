let firstNumber = 0;
let operator = "";
let secondNumber = 0;
let isTurnedOn = false;
let selectedNumber;

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

function populateDisplay(displayedString) {
    document.querySelector(".calculator-screen-text").textContent = displayedString;
}

let powerButton = document.querySelector(".on-button");

powerButton.addEventListener("click", () => {
    document.querySelector(".calculator-indicator-light").classList.toggle("calculator-on");

    if (isTurnedOn == true) {
        isTurnedOn = false;
    }
    else if (isTurnedOn == false) {
        isTurnedOn = true;
    }
    console.log(isTurnedOn);
});

const buttonWrapper = document.querySelector(".calculator-buttons-wrapper");
buttonWrapper.addEventListener("click", (e) => {
    const isButton = e.target.nodeName === "BUTTON";
    if (!isButton) {
        return;
    }
    let selectedNumber = e.target.innerHTML;
    populateDisplay(selectedNumber);
});
