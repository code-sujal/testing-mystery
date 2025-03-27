const inputDisplay = document.getElementById('input-display');
const outputDisplay = document.getElementById('output-display');
const clearBtn = document.getElementById('clear');
const equalsBtn = document.getElementById('equals');
const numberBtns = document.querySelectorAll('.number, #decimal');
const operatorBtns = document.querySelectorAll('.operator');
const memoryClearBtn = document.getElementById('memory-clear');
const memoryRecallBtn = document.getElementById('memory-recall');
const memoryAddBtn = document.getElementById('memory-add');
const memorySubtractBtn = document.getElementById('memory-subtract');
const backBtn = document.getElementById('back-btn');
const backspaceBtn = document.getElementById('backspace');

let currentInput = '0';
let previousInput = '';
let operation = null;
let memory = 0;

function updateDisplay() {
    inputDisplay.textContent = previousInput + (operation || '') + (currentInput !== '0' ? currentInput : '');
    outputDisplay.textContent = currentInput;
}

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentInput === '0' && btn.textContent !== '.') {
            currentInput = btn.textContent;
        } else if (btn.textContent === '.' && currentInput.includes('.')) {
            return;
        } else {
            currentInput += btn.textContent;
        }
        updateDisplay();
    });
});

operatorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (previousInput !== '' && currentInput !== '') {
            calculate();
        }
        previousInput = currentInput;
        currentInput = '0';
        operation = btn.textContent;
        updateDisplay();
    });
});

equalsBtn.addEventListener('click', () => {
    if (previousInput !== '' && operation !== null) {
        calculate();
        operation = null;
        previousInput = '';
    }
});

clearBtn.addEventListener('click', () => {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
});

backspaceBtn.addEventListener('click', () => {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
});

memoryClearBtn.addEventListener('click', () => {
    memory = 0;
});

memoryRecallBtn.addEventListener('click', () => {
    currentInput = memory.toString();
    updateDisplay();
});

memoryAddBtn.addEventListener('click', () => {
    memory += parseFloat(currentInput);
});

memorySubtractBtn.addEventListener('click', () => {
    memory -= parseFloat(currentInput);
});

backBtn.addEventListener('click', () => {
    window.location.href = 'welcome.html';
});

function calculate() {
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    let result;
    
    switch (operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '×':
            result = prev * curr;
            break;
        case '/':
            result = curr === 0 ? 'Error' : prev / curr;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    updateDisplay();
}

// Initial display
updateDisplay();