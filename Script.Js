let calculationNumbers = {
    firstNumber: null,
    secondNumber: null,
    selectedNumber: null,
}

let isTurnedOn = false;
let selectedOperation = null;
let hasEnteredFirstNumber = false;

function add(num1, num2) {
    let result = parseFloat(num1) + parseFloat(num2);
    return result.toFixed(2);
}

function subtract(num1, num2) {
    let result = num1 - num2;
    return result.toFixed(2);
}

function multiply(num1, num2) {
    let result = num1 * num2;
    return result.toFixed(2);
}

function divide(num1, num2) {
    let result = num1 / num2;
    return result.toFixed(2);
}

function performOperatation(operation) {
    let result;
    switch (operation) {
        case operation = "+":
            result = add(calculationNumbers.firstNumber, calculationNumbers.secondNumber);
            break;

        case operation = "-":
            result = subtract(calculationNumbers.firstNumber, calculationNumbers.secondNumber);
            break;

        case operation = "×":
            result = multiply(calculationNumbers.firstNumber, calculationNumbers.secondNumber);
            break;

        case operation = "÷":
            if (calculationNumbers.firstNumber === "0" || calculationNumbers.secondNumber === "0") {
                populateDisplay("ERROR");
                return
            } else
                result = divide(calculationNumbers.firstNumber, calculationNumbers.secondNumber);
    }

    calculationNumbers.firstNumber = result;
    calculationNumbers.secondNumber = null;
    populateDisplay(result);
    return result;
}

function populateDisplay(content) {
    document.querySelector(".calculator-screen-text").textContent = content;
}

function clearDisplay() {
    populateDisplay("");
}

function clearCalculator() {
    clearDisplay();
    calculationNumbers.selectedNumber = null;
    calculationNumbers.firstNumber = null;
    calculationNumbers.secondNumber = null;
    selectedOperation = null;
    hasEnteredFirstNumber = false;
}

let powerButton = document.querySelector(".on-button");

powerButton.addEventListener("click", () => {
    document.querySelector(".calculator-indicator-light").classList.toggle("calculator-on");

    if (isTurnedOn == true) {
        isTurnedOn = false;
        clearCalculator();
    }
    else if (isTurnedOn == false) {
        isTurnedOn = true;
    }
    console.log(isTurnedOn);
});

const numberButtonsWrapper = document.querySelector(".calculator-buttons-wrapper");
numberButtonsWrapper.addEventListener("click", (e) => {
    const isButton = e.target.nodeName === "BUTTON";
    if (!isButton || !isTurnedOn) {
        return;
    }
    if (e.target.classList.contains("equals-button")) {
        return
    }
    if (calculationNumbers.selectedNumber === null) {
        calculationNumbers.selectedNumber = e.target.innerHTML;
    }
    else {
        if (calculationNumbers.selectedNumber.length >= 20) {
            return;
        }
        calculationNumbers.selectedNumber += e.target.innerHTML;
    }
    if (!hasEnteredFirstNumber) {
        calculationNumbers.firstNumber = calculationNumbers.selectedNumber;
    } else calculationNumbers.secondNumber = calculationNumbers.selectedNumber;
    populateDisplay(calculationNumbers.selectedNumber);
});


const operationsWrapper = document.querySelector(".calculator-top-row");
operationsWrapper.addEventListener("click", (e) => {
    const isButton = e.target.nodeName === "BUTTON";
    if (!isButton || !isTurnedOn) {
        return
    }
    if (calculationNumbers.selectedNumber === null) {
        return;
    }
    if (calculationNumbers.secondNumber === null) {
        hasEnteredFirstNumber = true;
        calculationNumbers.selectedNumber = null;
        selectedOperation = e.target.innerHTML;
        populateDisplay(calculationNumbers.firstNumber + " " + selectedOperation);
    } else {
        performOperatation(selectedOperation);
        selectedOperation = e.target.innerHTML;
        populateDisplay(calculationNumbers.firstNumber + " " + selectedOperation)
        calculationNumbers.selectedNumber = null;

    }
});


const clearButton = document.querySelector(".calculator-clear-button");
clearButton.addEventListener("click", () => {
    clearCalculator();
});

const operateButton = document.querySelector(".equals-button");
operateButton.addEventListener("click", (e) => {

    if (calculationNumbers.secondNumber === null) {
        return
    }
    performOperatation(selectedOperation);
})