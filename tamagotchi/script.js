window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const petImg = document.getElementById("pet");
  const leftButton = document.querySelector(".left-device-button");
  const rightButton = document.querySelector(".right-device-button");
  const middleButton = document.querySelector(".middle-device-button");
  const deviceButtons = document.querySelectorAll('[class$="device-button"]');

  const audio = new Audio("https://fishfinna.github.io/neocities-site/assets/audio/effects/a.wav");
  audio.volume = 0.25;

  function resizeCanvas() {
    const size = canvas.clientWidth;
    canvas.width = size;
    canvas.height = size;
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
    centerPet();
  });

  const pet = { x: 0, y: 0, size: 0, speed: 0.4, direction: 1, walkTimer: 0, nextDecision: 0 };

  function centerPet() {
    pet.size = canvas.width * 0.4;
    pet.x = (canvas.width - pet.size) / 2;
    pet.y = canvas.height - pet.size - 6;
  }

  function decideNextAction() {
    pet.nextDecision = 60 + Math.random() * 180;
    if (Math.random() < 0.6) {
      pet.walkTimer = pet.nextDecision;
      pet.direction = Math.random() < 0.5 ? -1 : 1;
    } else {
      pet.walkTimer = 0;
    }
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (pet.walkTimer > 0) {
      pet.x += pet.speed * pet.direction;
      pet.walkTimer--;
    } else {
      pet.nextDecision--;
      if (pet.nextDecision <= 0) decideNextAction();
    }

    if (pet.x <= 0) {
      pet.x = 0;
      pet.direction = 1;
      pet.walkTimer = 60 + Math.random() * 120;
    }
    if (pet.x + pet.size >= canvas.width) {
      pet.x = canvas.width - pet.size;
      pet.direction = -1;
      pet.walkTimer = 60 + Math.random() * 120;
    }

    ctx.imageSmoothingEnabled = false;
    ctx.save();
    if (pet.direction === 1) {
      ctx.translate(pet.x + pet.size, pet.y);
      ctx.scale(-1, 1);
      ctx.drawImage(petImg, 0, 0, pet.size, pet.size);
    } else {
      ctx.drawImage(petImg, pet.x, pet.y, pet.size, pet.size);
    }
    ctx.restore();

    requestAnimationFrame(update);
  }

  petImg.style.display = "none";
  resizeCanvas();
  centerPet();
  decideNextAction();
  update();

  deviceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    });
  });
});
