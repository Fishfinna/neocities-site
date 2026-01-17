window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const pet = document.getElementById("pet");
  const startButton = document.getElementById("start");

  const leftButton = document.querySelector(".left-device-button");
  const rightButton = document.querySelector(".right-device-button");
  const middleButton = document.querySelector(".middle-device-button");
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

  let petX = 0;
  const MOVE_STEP = 30;

  function updatePetPosition() {
    pet.style.transform = `translateX(${petX}px)`;
  }

  leftButton.addEventListener("click", () => {
    petX -= MOVE_STEP;
    updatePetPosition();
  });

  rightButton.addEventListener("click", () => {
    petX += MOVE_STEP;
    updatePetPosition();
  });

  middleButton.addEventListener("click", () => {
    if (petX > 0) {
      petX = Math.max(0, petX - MOVE_STEP);
    } else if (petX < 0) {
      petX = Math.min(0, petX + MOVE_STEP);
    }
    updatePetPosition();
  });

  deviceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!muted) {
        audio.currentTime = 0;
        audio.play().catch((err) => {
          console.error("Audio play failed:", err);
        });
      }
    });
  });

  function startGame() {
    canvas.classList.add("active");
    startButton.style.display = "none";
    resizeCanvas();
  }

  if (startButton.getAttribute("dev") === "on") {
    startGame();
  } else {
    startButton.addEventListener("click", startGame);
  }
});
