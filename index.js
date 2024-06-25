const card1 = document.querySelector(".card1");
const hand = document.querySelector(".hand");
const handX = hand.getBoundingClientRect().x;
const handY = hand.getBoundingClientRect().y;

let isDragging = false;
let initialX, initialY;

card1.addEventListener("mousedown", (e) => {
  isDragging = true;
  console.log(card1.getBoundingClientRect());
  initialX = card1.getBoundingClientRect().x;
  initialY = card1.getBoundingClientRect().y;
  card1.style.cursor = "grabbing";
});

document.addEventListener(
  "mousemove",
  throttle((e) => {
    if (!isDragging) return;
    const newX = e.clientX - handX;
    const newY = e.clientY - handY;
    card1.style.transform = `translate(${newX}px, ${newY}px)`;
  }, 16)
); // Throttle to ~60 FPS

document.addEventListener("mouseup", () => {
  isDragging = false;
  card1.style.transform = `translate(${0}px, ${0}px)`;
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
