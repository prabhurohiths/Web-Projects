const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const init = {
  dx: 5,
  dy: 4,
  x: 200,
  y: 200,
  size: 30,
};

const color = [
  "#cdb4db",
  "#0081a7",
  "#8ac926",
  "#00f5d4",
  "#ffc6ff",
  "#d7263d",
  "#ffd23f",
];
let currentColor = 0;

setInterval(() => {
  if (currentColor < 6) {
    currentColor += 1;
  } else {
    currentColor = 0;
  }
}, 1000);

const drawCircle = () => {
  ctx.beginPath();
  ctx.arc(init.x, init.y, init.size, 0, Math.PI * 2);
  ctx.fillStyle = color[currentColor];
  ctx.fill();
};

const update = () => {
  //   changeColor();
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle();
  init.x += init.dx;
  init.y += init.dy;

  // sidewall collision detecion
  if (init.x + init.size > canvas.width || init.x - init.size < 0) {
    init.dx *= -1;
  }
  // tob and bottom collision detection
  if (init.y + init.size > canvas.height || init.y - init.size < 0) {
    init.dy *= -1;
  }
  requestAnimationFrame(update);
};

update();
