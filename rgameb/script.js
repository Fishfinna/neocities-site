function generateRandomHexCode() {
  const hexChars = "0123456789ABCDEF";
  let hex = "";
  while (hex.length < 6) {
    hex += hexChars[Math.floor(Math.random() * hexChars.length)];
  }
  return hex;
}

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function colorClosenessPercent(guess, actual) {
  const g = hexToRgb(guess);
  const a = hexToRgb(actual);

  const distance = Math.sqrt(
    Math.pow(g.r - a.r, 2) + Math.pow(g.g - a.g, 2) + Math.pow(g.b - a.b, 2),
  );

  const maxDistance = Math.sqrt(3 * Math.pow(255, 2));
  const percent = Math.max(0, 100 - (distance / maxDistance) * 100);

  return Math.round(percent);
}

const color = document.getElementById("color");
const form = document.getElementById("colorForm");
const guessInput = form.querySelector('input[name="color-guess"]');
const resultMessage = document.getElementById("resultMessage");

let currentColor = "";

const changeColor = (newColor) => {
  currentColor = newColor;
  color.style.backgroundColor = newColor;

  const blobPaths = document.querySelectorAll("#visual path");
  let opacity = 0.3;

  blobPaths.forEach((path) => {
    path.setAttribute("fill", newColor);
    path.setAttribute("fill-opacity", opacity.toFixed(2));
    opacity += 0.1;
    if (opacity > 1) opacity = 1;
  });
};

window.addEventListener("load", () => {
  const newColor = "#" + generateRandomHexCode();
  color.value = newColor;
  changeColor(newColor);
});

guessInput.addEventListener("input", () => {
  let value = guessInput.value.replace(/#/g, "").toUpperCase();
  guessInput.value = value ? `#${value}` : "";
  const guessCount = guessInput.value.length;
  guessInput.style.color = guessCount < 7 || guessCount > 7 ? "red" : "green";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const guess = guessInput.value;

  if (!/^#[0-9A-F]{6}$/i.test(guess)) {
    resultMessage.textContent = "Please enter a valid 6-digit hex color.";
    return;
  }

  const percent = colorClosenessPercent(guess, currentColor);

  resultMessage.textContent = `Answer: ${currentColor} — ${percent}% match`;

  if (percent > 75) {
    resultMessage.style.color = "green";
  } else {
    resultMessage.style.color = "black";
  }

  guessInput.value = "";

  const newColor = "#" + generateRandomHexCode();
  changeColor(newColor);
});
