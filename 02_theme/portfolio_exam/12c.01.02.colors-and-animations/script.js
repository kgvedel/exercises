const button = document.querySelector("#switch");
const useDark = window.matchMedia("(prefers-color-scheme: dark)");

function toggleDarkMode(state) {
  console.log("dark");
    document.documentElement.classList.toggle("dark-mode", state);
    
  }

button.addEventListener("click",()=> {
  document.documentElement.classList.toggle("dark-mode");

});

useDark.addEventListener((evt) => toggleDarkMode(evt.matches));


