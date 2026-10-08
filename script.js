// ===== 1. OPENING ANIMATION =====
// Edit the lines below to change the boot messages.
const lines = ["> INITIALIZING PROFILE...", "> LOADING MODULES... OK", "> ACCESS GRANTED"];
const boot = document.getElementById("boot");
const out = document.getElementById("bootText");
let line = 0, ch = 0;

function type() {
  if (line >= lines.length) return setTimeout(enter, 700);
  out.textContent = lines.slice(0, line).join("\n") + (line ? "\n" : "") + lines[line].slice(0, ++ch);
  if (ch === lines[line].length) { line++; ch = 0; setTimeout(type, 350); }
  else setTimeout(type, 35);
}
function enter() {                       // glitch-out transition into the profile
  boot.classList.add("out");
  setTimeout(() => { boot.remove(); document.body.classList.remove("booting"); }, 900);
}
type();

// ===== 2. MOBILE MENU =====
const menu = document.getElementById("menu");
document.getElementById("menuBtn").onclick = () => menu.classList.toggle("open");
menu.querySelectorAll("a").forEach(a => a.onclick = () => menu.classList.remove("open"));

// ===== 3. HIGHLIGHT CURRENT SECTION IN NAV =====
const links = [...menu.querySelectorAll("a")];
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle("active", l.hash === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("section[id]").forEach(s => io.observe(s));

// ===== 4. SKILL BARS: fill to data-level when scrolled into view =====
const bars = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.querySelector("i").style.width = e.target.dataset.level + "%";
  });
}, { threshold: .4 });
document.querySelectorAll(".skill").forEach(s => bars.observe(s));

// ===== 5. FOOTER YEAR =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== 6. SUBTLE BINARY RAIN BACKGROUND =====
const c = document.getElementById("rain"), g = c.getContext("2d");
let drops = [];
function resize() {
  c.width = innerWidth; c.height = innerHeight;
  drops = Array(Math.floor(c.width / 22)).fill(0).map(() => Math.random() * c.height / 18);
}
resize(); addEventListener("resize", resize);
setInterval(() => {
  g.fillStyle = "rgba(5,8,6,.12)"; g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = "#39ff14"; g.font = "14px monospace";
  drops.forEach((y, i) => {
    g.fillText(Math.random() > .5 ? "1" : "0", i * 22, y * 18);
    drops[i] = y * 18 > c.height && Math.random() > .975 ? 0 : y + 1;
  });
}, 90);
