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
    const noteSrc = `./assets/audio/effects/${getNote()}.wav`;
    const audio = new Audio(noteSrc);
    audio.volume = 0.2;
    audio.play();
  });
});
