// midi logic
const midiContainer = document.querySelector(".midi");
const originalKeys = Array.from(document.querySelectorAll(".piano-key"));
let isMouseDown = false;
const context = new (window.AudioContext || window.webkitAudioContext)();
const cat = document.getElementById("cat-with-guitar-image");
let catRotation = 0;

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
  let step = 20;
  catRotation += step;
  cat.style.transform = `rotateY(${catRotation}deg) rotateX(${
    catRotation * 0.3
  }deg)`;

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

const allKeys = Array.from(midiContainer.querySelectorAll(".piano-key"));
const lastKey = allKeys[allKeys.length - 1];
if (lastKey.className.includes("-sharp")) {
  lastKey.remove();
}

// cat logic
cat.addEventListener("click", () => {
  cat.style.animationName =
    cat.style.animationName == "catDance" ? "" : "catDance";
});

// play logic
const playButtons = document.querySelectorAll(
  ".material-symbols-rounded.audio-toggle"
);
const audioElements = document.querySelectorAll("audio");
const timelines = document.querySelectorAll(".timeline");
const currentTimes = document.querySelectorAll(".current-time");
const totalTimes = document.querySelectorAll(".total-time");

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

audioElements.forEach((audio, i) => {
  const btn = playButtons[i];
  const timeline = timelines[i];
  const currentTimeLabel = currentTimes[i];
  const totalTimeLabel = totalTimes[i];

  audio.addEventListener("loadedmetadata", () => {
    timeline.max = audio.duration;
    totalTimeLabel.textContent = formatTime(audio.duration);
  });

  // Update timeline as the audio plays
  audio.addEventListener("timeupdate", () => {
    timeline.value = audio.currentTime;
    currentTimeLabel.textContent = formatTime(audio.currentTime);
  });

  // Seek when user drags timeline
  timeline.addEventListener("input", () => {
    audio.currentTime = timeline.value;
    currentTimeLabel.textContent = formatTime(audio.currentTime);
  });

  // Play/pause button
  btn.addEventListener("click", () => {
    const playText = "play_arrow";
    const pauseText = "pause";
    if (audio.paused) {
      audio.play();
      btn.textContent = pauseText;
    } else {
      audio.pause();
      btn.textContent = playText;
    }
  });

  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    timeline.value = 0;
    currentTimeLabel.textContent = formatTime(0);
    btn.textContent = "play_arrow";
  });
});
