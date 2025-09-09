// CLOCK
function updateClock() {
  const time = new Date();
  document.getElementById("time").textContent =
    time.toLocaleTimeString("id-ID");
}
setInterval(updateClock, 1000);
updateClock();

// BACKGROUND canvas (bulatan acak)
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let circles = [];
for (let i = 0; i < 50; i++) {
  circles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 5 + 2,
    dx: (Math.random() - 0.5) * 1,
    dy: (Math.random() - 0.5) * 1,
  });
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(240, 84, 84, 0.7)";
  circles.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fill();
    c.x += c.dx;
    c.y += c.dy;
    if (c.x < 0 || c.x > canvas.width) c.dx *= -1;
    if (c.y < 0 || c.y > canvas.height) c.dy *= -1;
  });
  requestAnimationFrame(animate);
}
animate();

// Resize canvas
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// SCROLL ANIMATION
const faders = document.querySelectorAll(".fade-in");
const appearOptions = { threshold: 0.2 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// POPUP HANDLER
const openDetail = document.getElementById("openDetail");
const detailPopup = document.getElementById("detailPopup");
const closePopup = document.getElementById("closePopup");
const mainContent = document.getElementById("mainContent");

openDetail.addEventListener("click", () => {
  detailPopup.style.display = "flex";
  mainContent.classList.add("blur");
});

closePopup.addEventListener("click", () => {
  detailPopup.style.display = "none";
  mainContent.classList.remove("blur");
});

window.addEventListener("click", e => {
  if (e.target === detailPopup) {
    detailPopup.style.display = "none";
    mainContent.classList.remove("blur");
  }

});
// MUSIC CONTROL
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = "🎵 Pause Music";
  } else {
    bgMusic.pause();
    musicToggle.textContent = "▶ Play Music";
  }
});