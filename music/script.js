// midi logic
const midiContainer = document.querySelector(".midi");
const originalKeys = Array.from(document.querySelectorAll(".piano-key"));
let isMouseDown = false;
const context = new (window.AudioContext || window.webkitAudioContext)();

async function playNote(element) {
  const detune = parseInt(element.dataset.octave) || 0;
  const note =
    element.className.replaceAll("piano-key ", "").replaceAll("-sharp", "%23") +
    ".wav";
  const noteSrc = `../../assets/audio/effects/${note}`;
  const response = await fetch(noteSrc);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await context.decodeAudioData(arrayBuffer);
  const source = context.createBufferSource();
  source.buffer = audioBuffer;
  source.detune.value = detune * 1200;
  source.connect(context.destination);
  source.start();
}

function attachKeyEvents(key) {
  key.addEventListener("mousedown", () => playNote(key));
  key.addEventListener("mouseenter", () => {
    if (isMouseDown) playNote(key);
  });
}

document.addEventListener("mousedown", () => (isMouseDown = true));
document.addEventListener("mouseup", () => (isMouseDown = false));

originalKeys.forEach((key) => {
  key.dataset.octave = 0;
  attachKeyEvents(key);
});

for (let i = originalKeys.length - 1; i >= 0; i--) {
  const key = originalKeys[i];
  const clone = key.cloneNode(true);
  clone.dataset.octave = -1;
  midiContainer.insertBefore(clone, midiContainer.firstChild);
  attachKeyEvents(clone);
}

originalKeys.forEach((key) => {
  const clone = key.cloneNode(true);
  clone.dataset.octave = 1;
  midiContainer.appendChild(clone);
  attachKeyEvents(clone);
});

// cat logic
const cat = document.getElementById("cat-with-guitar-image");
cat.addEventListener("click", () => {
  console.log("clicked");
  cat.style.animationName =
    cat.style.animationName == "catDance" ? "" : "catDance";
});

// play logic
const playButtons = document.querySelectorAll(
  ".material-symbols-rounded.audio-toggle"
);
playButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.textContent =
      btn.textContent.trim() === "play_arrow" ? "pause" : "play_arrow";
  });
});
