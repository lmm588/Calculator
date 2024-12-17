let firstNumber;
let secondNumber
let isTurnedOn = false;
let selectedNumber;
let selectedOperation;

function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
    return num1 - num2;
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
            result = add(firstNumber, secondNumber);
            break;

        case operation = "-":
            result = subtract(firstNumber, secondNumber);
            break;

        case operation = "×":
            result = multiply(firstNumber, secondNumber);
            break;

        case operation = "÷":
            if(firstNumber === "0" || secondNumber === "0") {
                populateDisplay("ERROR");
                return
            } else
            result = divide(firstNumber, secondNumber);
    }

    clearCalculator();
    selectedNumber = result;
    firstNumber = result;
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
    selectedNumber = undefined;
    firstNumber = undefined;
    secondNumber = undefined;
    selectedOperation = undefined;
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

    if (selectedNumber === undefined) {
        selectedNumber = e.target.innerHTML;
    }
    else {
        if (selectedNumber.length >= 45) {
            return;
        }
        selectedNumber = selectedNumber + e.target.innerHTML;
    }
    populateDisplay(selectedNumber);
});


const operationsWrapper = document.querySelector(".calculator-top-row");
operationsWrapper.addEventListener("click", (e) => {
    const isButton = e.target.nodeName === "BUTTON";
    if (!isButton || !isTurnedOn) {
        return
    }
    if (selectedNumber === undefined) {
        populateDisplay("ERROR");
        return
    }
    if (selectedOperation === undefined) {
        selectedOperation = e.target.innerHTML;
        firstNumber = selectedNumber;
        populateDisplay(firstNumber + " " + selectedOperation);
    } else {
        operateButton.click();
        firstNumber = document.querySelector(".calculator-screen-text").innerHTML;
    }
    selectedNumber = undefined;
});


const clearButton = document.querySelector(".calculator-clear-button");
clearButton.addEventListener("click", () => {
    clearCalculator();
});

const operateButton = document.querySelector(".calculator-equals-button");
operateButton.addEventListener("click", (e) => {
    secondNumber = selectedNumber;
    if (selectedNumber === undefined) {
        return
    }
    performOperatation(selectedOperation);
})