const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

c.beginPath();
c.arc(100, 75, 50, 0, 2 * Math.PI);
c.stroke();
