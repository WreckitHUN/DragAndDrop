// JavaScript
const card1 = document.querySelector(".card1");
let isDragging = false;
let initialX, initialY;

card1.addEventListener("mousedown", (e) => {
  isDragging = true;
  console.log(e.clientX);
  console.log(card1.getBoundingClientRect().x);
  initialX = card1.getBoundingClientRect().x;
  initialY = card1.getBoundingClientRect().y;
  card1.style.cursor = "grabbing";
});

document.addEventListener(
  "mousemove",
  throttle((e) => {
    if (!isDragging) return;
    const newX = e.clientX;
    const newY = e.clientY;
    card1.style.transform = `translate(${newX}px, ${newY}px)`;
  }, 16)
); // Throttle to ~60 FPS

document.addEventListener("mouseup", () => {
  isDragging = false;
  card1.style.cursor = "grab";
});

// Throttle function (adjust interval as needed)
function throttle(callback, interval) {
  let lastTime = 0;
  return function (event) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      callback(event);
      lastTime = now;
    }
  };
}
