const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const creatureColorLight = "#8f8f8f";
const creatureColorDark = "#8f8f8f";

// Resize canvas to fill window
function resizeCanvas() {
  canvas.width = window.innerWidth / 2;
  canvas.height = window.innerHeight / 2;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Creature state
let creature = {
  x: 50,
  y: canvas.height / 2,
  vx: 2,
  width: 16,
  height: 16,
  bounceOffset: 0,
  facingRight: true,
  paused: false,
  pauseTimer: 0,
};

const PAUSE_DURATION = 2000;

// Click to pause and bounce
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

  // Walk and bounce
  creature.x += creature.vx;
  creature.bounceOffset = Math.abs(Math.sin(Date.now() / 150) * 3);

  if (creature.x < 0 || creature.x > canvas.width - creature.width * 3) {
    creature.vx *= -1;
    creature.facingRight = !creature.facingRight;
  }
}

function drawCreature(x, y, scale = 3) {
  // Body
  ctx.fillStyle = creatureColorDark;
  ctx.fillRect(x, y, 16 * scale, 16 * scale);

  // Eyes
  ctx.fillStyle = creatureColorLight;
  let eyeOffsetX = creature.facingRight ? 4 : 8;
  ctx.fillRect(x + eyeOffsetX * scale, y + 5 * scale, scale * 2, scale * 2);
  ctx.fillRect(
    x + (eyeOffsetX + 6) * scale,
    y + 5 * scale,
    scale * 2,
    scale * 2
  );
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

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
