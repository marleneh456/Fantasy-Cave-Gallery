// Scene Background
const images = [
  "images/cave1.jpg",
  "images/cave2.jpg",
  "images/cave3.jpg",
  "images/cave4.jpg",
  "images/cave5.jpg",
  "images/cave6.jpg",
  "images/cave7.jpg"
];
let currentIndex = 0;
const background = document.getElementById("background");

function setBackground(index) {
  background.style.backgroundImage = `url(${images[index]})`;
}

function changeScene(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;
  setBackground(currentIndex);
}

window.onload = () => {
  setBackground(currentIndex);
};

// Aura trail (mouse + touch)
const canvas = document.getElementById("auraCanvas");
const ctx = canvas.getContext("2d");
let points = [];
let auraColor = { r: 200, g: 100, b: 255 };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function addPoint(x, y) {
  points.push({ x, y, alpha: 1 });
  if (points.length > 40) points.shift();
}

document.addEventListener("mousemove", (e) => addPoint(e.clientX, e.clientY));
document.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  if (touch) addPoint(touch.clientX, touch.clientY);
}, { passive: false });

function drawAuraTrail() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of points) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${auraColor.r}, ${auraColor.g}, ${auraColor.b}, ${p.alpha})`;
    ctx.shadowColor = `rgba(${auraColor.r}, ${auraColor.g}, ${auraColor.b}, 0.7)`;
    ctx.shadowBlur = 20;
    ctx.fill();
    p.alpha *= 0.94;
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawAuraTrail);
}
drawAuraTrail();

function changeAuraColor() {
  auraColor = {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256)
  };
}
