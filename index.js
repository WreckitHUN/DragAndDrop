// Disable text selection for the entire page
document.addEventListener("selectstart", (e) => {
  e.preventDefault();
});

let grabbedCard = undefined;
let initialRot = 0;
const hand = document.querySelector(".hand");
const handX = hand.getBoundingClientRect().x;
const handY = hand.getBoundingClientRect().y;

let isDragging = false;
let initialX, initialY;

hand.addEventListener("mousedown", (e) => {
  isDragging = true;
  const card = e.target;
  grabbedCard = card;
  const computedStyle = window.getComputedStyle(grabbedCard, null);
  const matrix = computedStyle.getPropertyValue("transform");

  let values = matrix.split("(")[1];
  values = values.split(")")[0];
  values = values.split(",");

  const a = values[0];
  const b = values[1];

  const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  initialRot = angle;
  console.log(angle);

  console.log(values);
  initialX = card.getBoundingClientRect().x;
  initialY = card.getBoundingClientRect().y;
  grabbedCard.style.cursor = "grabbing";
});

document.addEventListener(
  "mousemove",
  throttle((e) => {
    if (!isDragging) return;
    const newX = e.clientX - handX - 30;
    const newY = e.clientY - handY - 40;
    grabbedCard.style.transform = `translate(${newX}px, ${newY}px)`;
  }, 8)
); // Throttle to ~60 FPS

document.addEventListener("mouseup", () => {
  isDragging = false;
  grabbedCard.style.transform = `translate(${0}px, ${0}px) rotate(${initialRot}deg)`;
  grabbedCard.style.cursor = "grab";
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
