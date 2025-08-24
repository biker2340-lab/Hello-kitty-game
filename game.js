const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let kitty = { x: 180, y: 500, width: 40, height: 40 };
let kuromis = [];
let score = 0;

function drawKitty() {
  ctx.fillStyle = "#ff69b4";
  ctx.fillRect(kitty.x, kitty.y, kitty.width, kitty.height);
}

function drawKuromis() {
  ctx.fillStyle = "#800080";
  kuromis.forEach(k => {
    ctx.fillRect(k.x, k.y, k.size, k.size);
  });
}

function updateKuromis() {
  kuromis.forEach(k => k.y += 3);
  kuromis = kuromis.filter(k => k.y < canvas.height);
}

function spawnKuromi() {
  const size = 30;
  const x = Math.random() * (canvas.width - size);
  kuromis.push({ x, y: 0, size });
}

function checkCollision() {
  kuromis.forEach(k => {
    if (
      kitty.x < k.x + k.size &&
      kitty.x + kitty.width > k.x &&
      kitty.y < k.y + k.size &&
      kitty.y + kitty.height > k.y
    ) {
      alert("Kuromi got you! Final Score: " + score);
      document.location.reload();
    }
  });
}

function drawScore() {
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawKitty();
  drawKuromis();
  updateKuromis();
  checkCollision();
  drawScore();
  score++;
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && kitty.x > 0) kitty.x -= 20;
  if (e.key === "ArrowRight" && kitty.x < canvas.width - kitty.width) kitty.x += 20;
});

setInterval(spawnKuromi, 1000);
gameLoop();
