window.addEventListener("load", () => {
  let muted = true;

  const muteButton = document.getElementById("mute");
  const clickToUnmute = document.getElementById("click-unmute-info");
  muteButton.addEventListener("click", () => {
    clickToUnmute.remove();
    const img = muteButton.querySelector("img");
    muted = !muted;
    const imgName = muted ? "mute" : "audio";
    const path = `./assets/art/icons/${imgName}.png`;
    img.setAttribute("src", path);
  });

  const buttons = document.querySelectorAll("button");
  const audios = ["f", "a", "c", "a", "f", "d", "f", "d"];

  function createNoteGetter(notes) {
    let index = 0;
    return function getNote() {
      const note = notes[index];
      index = (index + 1) % notes.length;
      return note;
    };
  }

  const getNote = createNoteGetter(audios);

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      const noteSrc = `https://fishfinna.github.io/neocities-site/assets/audio/effects/${getNote()}.wav`;
      const audio = new Audio(noteSrc);
      if (!muted)
        audio.play().catch((err) => {
          console.error("Audio play failed:", err);
        });
    });
  });
});
