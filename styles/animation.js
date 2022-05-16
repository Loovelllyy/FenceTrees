const screen = document.querySelector(".screen");
const start = document.getElementById("start");
const authorsBlock = document.querySelector(".authors-block");


start.addEventListener('click', (event) => {
    event.preventDefault();
    screen.classList.add('up');
})

addEventListener("keydown", (ev) => {
    if (ev.altKey && ev.code === "KeyA") {
        authorsBlock.classList.toggle("hidden")
    }
})