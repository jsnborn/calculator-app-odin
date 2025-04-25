const display = document.getElementById("display");
const clickSound = document.getElementById("clickSound");

let currentInput = "";
let resultDisplayed = false;

function setTheme(themeName) {
  const newClass = `theme-${themeName}`;
  const oldClass = document.body.classList[0];

  if (oldClass !== newClass) {
    document.body.classList.replace(oldClass, newClass);
  } else {
    document.body.classList.add(newClass);
  }

  localStorage.setItem("theme", themeName);
}

// Load saved theme on page load
const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(`theme-${savedTheme}`);

function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function appendValue(value) {
  playSound();

  if (resultDisplayed && !isOperator(value)) {
    currentInput = "";
    resultDisplayed = false;
  }

  const lastChar = currentInput.slice(-1);
  if (isOperator(lastChar) && isOperator(value)) {
    currentInput = currentInput.slice(0, -1);
  }

  currentInput += value;
  display.value = currentInput;
}

function clearDisplay() {
  playSound();
  currentInput = "";
  display.value = "";
  resultDisplayed = false;
}

function backspace() {
  playSound();
  currentInput = currentInput.slice(0, -1);
  display.value = currentInput;
}

function calculate() {
  playSound();
  try {
    if (isOperator(currentInput.slice(-1))) {
      currentInput = currentInput.slice(0, -1);
    }

    const result = eval(currentInput);
    display.value = result;
    currentInput = result.toString();
    resultDisplayed = true;
  } catch {
    display.value = "Error";
    resultDisplayed = true;
  }
}

function isOperator(char) {
  return ["+", "-", "*", "/"].includes(char);
}

