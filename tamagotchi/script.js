const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("start");

function resizeCanvas() {
  canvas.width = window.innerWidth / 2;
  canvas.height = window.innerHeight / 2;
}
window.addEventListener("resize", resizeCanvas);

const PAUSE_DURATION = 2000;

startButton.addEventListener("click", () => {
  canvas.classList.add("active");
  startButton.style.display = "none";

  resizeCanvas();
  registerCreatureClickHandler();
  requestAnimationFrame(loop);
});

function startGame() {
  canvas.classList.add("active");
  startButton.style.display = "none";
}

if (startButton.getAttribute("dev") === "on") {
  startGame();
} else {
  startButton.addEventListener("click", startGame);
}
