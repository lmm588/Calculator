let calculationNumbers = {
    firstNumber: null,
    secondNumber: null,
    selectedNumber: null,
}

let selectedOperation = null;
let hasEnteredFirstNumber = false;

function add(num1, num2) {
    let result = parseFloat(num1) + parseFloat(num2);
    return result.toFixed(2).replace(/[.,]00$/, "");
}

function subtract(num1, num2) {
    let result = num1 - num2;
    return result.toFixed(2).replace(/[.,]00$/, "");
}

function multiply(num1, num2) {
    let result = num1 * num2;
    return result.toFixed(2).replace(/[.,]00$/, "");
}

function divide(num1, num2) {
    let result = num1 / num2;
    return result.toFixed(2).replace(/[.,]00$/, "");
}

function performOperation(operation) {
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
    selectedOperation = null;
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

const numberButtonsWrapper = document.querySelector(".calculator-buttons-wrapper");
numberButtonsWrapper.addEventListener("click", (e) => {
    const isButton = e.target.nodeName === "BUTTON";
    if (!isButton) {
        return;
    }
    if (e.target.classList.contains("equals-button")) {
        return
    }
    if (calculationNumbers.selectedNumber === null) {
        calculationNumbers.selectedNumber = e.target.innerHTML;
    }
    else {
        if (calculationNumbers.selectedNumber.length >= 15) {
            return;
        }
        calculationNumbers.selectedNumber += e.target.innerHTML;
    }
    if (!hasEnteredFirstNumber) {
        calculationNumbers.firstNumber = calculationNumbers.selectedNumber;
    } else calculationNumbers.secondNumber = calculationNumbers.selectedNumber;
    populateDisplay(hasEnteredFirstNumber ? calculationNumbers.firstNumber + ` ${selectedOperation} ` + calculationNumbers.selectedNumber : calculationNumbers.selectedNumber);
});


const operationsWrapper = document.querySelector(".calculator-top-row");
operationsWrapper.addEventListener("click", (e) => {
    const isButton = e.target.nodeName === "BUTTON";
    if (!isButton) {
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
        performOperation(selectedOperation);
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
    performOperation(selectedOperation);
})