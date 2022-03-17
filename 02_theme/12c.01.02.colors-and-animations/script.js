const button = document.querySelector("#switch");
const userDark = window.matchMedia("(prefers-color-scheme:dark)");

function toggleDarkMode(state) {
    document.documentElement.classList.toggle("dark-mode", state);
  }