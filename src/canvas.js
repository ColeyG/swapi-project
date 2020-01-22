const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const starAmount = 1000;
const starArray = [];
const star = document.getElementById('star');

function Star(x, y) {
  this.x = x;
  this.y = y;
  this.update = () => {
    this.x++;
    if (this.x > canvas.width) {
      this.x = -10;
    }
    c.drawImage(star, this.x, this.y, 5, 5);
  };
}

function newStar() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  starArray.push(new Star(x, y));
}

for (let i = 0; i < starAmount; i++) {
  newStar();
}

const animate = () => {
  requestAnimationFrame(animate);
  c.fillStyle = '#16161d';
  c.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < starArray.length; i++) {
    starArray[i].update();
  }
};

animate();
