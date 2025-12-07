const color = document.getElementById("color");
color.addEventListener("click", () => {
  color.style.backgroundColor = `#${Math.floor(
    Math.random() * 10
  )}0${Math.floor(Math.random() * 10)}000`;
});
