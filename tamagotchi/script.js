const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("start");

const creatureColorLight = "#373737ff";
const creatureColorDark = "#494947ff";

let animationFrameId = null;

// Resize canvas to fill part of the window
function resizeCanvas() {
  canvas.width = window.innerWidth / 2;
  canvas.height = window.innerHeight / 2;
}
window.addEventListener("resize", resizeCanvas);

// Creature state
let creature = {
  x: 50,
  y: 200,
  vx: 2,
  width: 40,
  height: 34,
  bounceOffset: 1,
  facingRight: true,
  paused: true,
  pauseTimer: 1,
};

const PAUSE_DURATION = 2000;

// Only register click listener once the game starts
function registerCreatureClickHandler() {
  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    if (
      cx > creature.x &&
      cx < creature.x + creature.width * 3 &&
      cy > creature.y &&
      cy < creature.y + creature.height * 3
    ) {
      if (!creature.paused) {
        creature.paused = true;
        creature.pauseTimer = PAUSE_DURATION;
      }
    }
  });
}

function update(deltaTime) {
  if (creature.paused) {
    creature.pauseTimer -= deltaTime;
    creature.bounceOffset = Math.sin(Date.now() / 100) * 4;

    if (creature.pauseTimer <= 0) {
      creature.paused = false;
      creature.bounceOffset = 0;
    }
    return;
  }

  creature.x += creature.vx;
  creature.bounceOffset = Math.abs(Math.sin(Date.now() / 150) * 3);

  if (creature.x < 0 || creature.x > canvas.width - creature.width * 3) {
    creature.vx *= -1;
    creature.facingRight = !creature.facingRight;
  }
}

function drawCreature(x, y, scale = 3) {
  const mouthOpen = Math.abs(Math.sin(Date.now() / 200)) > 0.5; // nom cycle

  ctx.save();
  ctx.translate(x, y);
  if (!creature.facingRight) {
    ctx.scale(-1, 1); // flip horizontally
    ctx.translate(-creature.width * scale, 0);
  }

  // === BODY ===
  ctx.fillStyle = creatureColorDark;
  ctx.fillRect(4 * scale, 10 * scale, 20 * scale, 14 * scale); // torso

  // Tail
  ctx.fillRect(0 * scale, 14 * scale, 4 * scale, 6 * scale);

  // Legs
  ctx.fillRect(6 * scale, 24 * scale, 4 * scale, 4 * scale);
  ctx.fillRect(14 * scale, 24 * scale, 4 * scale, 4 * scale);

  // === HEAD ===
  ctx.fillRect(20 * scale, 6 * scale, 14 * scale, 12 * scale); // main head

  // Jaw (dark when closed, lighter when open)
  if (mouthOpen) {
    ctx.fillRect(20 * scale, 14 * scale, 14 * scale, 6 * scale); // open mouth lower half
    ctx.fillStyle = creatureColorLight;
    ctx.fillRect(20 * scale, 14 * scale, 14 * scale, 2 * scale); // highlight teeth row
  } else {
    ctx.fillRect(20 * scale, 14 * scale, 14 * scale, 2 * scale); // closed line
  }

  // === EYE ===
  ctx.fillStyle = creatureColorLight;
  ctx.fillRect(30 * scale, 8 * scale, 2 * scale, 2 * scale); // white part
  ctx.fillStyle = "#373737ff";
  ctx.fillRect(30 * scale, 8 * scale, scale, scale); // pupil

  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCreature(creature.x, creature.y + creature.bounceOffset);
}

let lastTime = 0;
function loop(timestamp) {
  const delta = timestamp - lastTime;
  lastTime = timestamp;

  update(delta);
  draw();

  animationFrameId = requestAnimationFrame(loop);
}

startButton.addEventListener("click", () => {
  canvas.classList.add("active");
  startButton.style.display = "none";

  resizeCanvas();
  registerCreatureClickHandler();
  requestAnimationFrame(loop);
});

// Start the game logic
function startGame() {
  canvas.classList.add("active");
  startButton.style.display = "none";

  resizeCanvas();
  registerCreatureClickHandler();
  requestAnimationFrame(loop);
}

// Check for dev="on" flag
if (startButton.getAttribute("dev") === "on") {
  startGame();
} else {
  startButton.addEventListener("click", startGame);
}
