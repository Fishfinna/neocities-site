function generateRandomHexCode() {
  const hexChars = "0123456789ABCDEF";
  let hex = "";
  while (hex.length < 6) {
    hex += hexChars[Math.floor(Math.random() * hexChars.length)];
  }
  return hex;
}

const color = document.getElementById("color");
color.addEventListener("click", () => {
  const newColor = generateRandomHexCode();
  color.style.backgroundColor = `#${newColor}`;
  console.log(newColor);
});
