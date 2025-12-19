function generateRandomHexCode() {
  const hexChars = "0123456789ABCDEF";
  let hex = "";
  while (hex.length < 6) {
    hex += hexChars[Math.floor(Math.random() * hexChars.length)];
  }
  return hex;
}

const color = document.getElementById("color");
const form = document.getElementById("colorForm");
const guessInput = form.querySelector('input[name="color-guess"]');

const changeColor = (newColor) => {
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

color.addEventListener("click", () => {
  const newColor = "#" + generateRandomHexCode();
  color.value = newColor;
  changeColor(newColor);
});

window.addEventListener("load", () => {
  const newColor = "#" + generateRandomHexCode();
  color.value = newColor;
  changeColor(newColor);
});

guessInput.addEventListener("input", () => {
  let value = guessInput.value.replace(/#/g, "").toUpperCase();
  guessInput.value = value ? `#${value}` : "";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  console.log(formData.get("color-guess"));
  guessInput.value = "";
});
