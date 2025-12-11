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
  const newColor = "#" + generateRandomHexCode();
  color.style.backgroundColor = newColor;

  const blobPaths = document.querySelectorAll("#visual path");
  let opacity = 0.3;

  blobPaths.forEach((path) => {
    path.setAttribute("fill", newColor);
    path.setAttribute("fill-opacity", opacity.toFixed(2));
    opacity += 0.1;
    if (opacity > 1) opacity = 1;
  });
});
