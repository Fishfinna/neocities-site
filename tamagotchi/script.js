window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const deviceButtons = document.querySelectorAll('[class$="device-button"]');
  const muted = false;
  const noteSrc =
    "https://fishfinna.github.io/neocities-site/assets/audio/effects/a.wav";
  const audio = new Audio(noteSrc);
  audio.volume = 0.25;

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

  deviceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!muted)
        audio.play().catch((err) => {
          console.error("Audio play failed:", err);
        });
    });
  });
});

const startButton = document.getElementById("start");

function startGame() {
  canvas.classList.add("active");
  startButton.style.display = "none";
}

if (startButton.getAttribute("dev") === "on") {
  startGame();
} else {
  startButton.addEventListener("click", startGame);
}

const leftButton = document.getElementByClass("left-device-button");
const rightButton = document.getElementByClass("right-device-button");
const middleButton = document.getElementByClass("middle-device-button");
const buttons = [leftButton, rightButton, middleButton];
