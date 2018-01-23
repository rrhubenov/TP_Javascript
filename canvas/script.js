var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth - 50;
ctx.canvas.height = window.innerHeight - 50;
var raf;
document.body.style.backgroundColor = "white";
var ham = new Image();
DrawHammer = function(){
  ham.src = 'https://vignette.wikia.nocookie.net/dofus/images/d/df/Handyman_Hammer.png/revision/latest?cb=20090816233427';  
}

/*function getMouse (e) {
  var rect = canvas.getBoundingClientRect()
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}*/

var ball = {
  radius: 35,
  x:  Math.floor((Math.random() * 300) + 35),
  y:  Math.floor((Math.random() * 300) + 35),
  vx: Math.floor((Math.random() * 10) - 10),
  vy: 5,
  color: 'blue',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

var hammer = {
  x: 200,
  y: 200,
  width: 150,
  height: 150,
  xv: 0,
  yv: 0,
  draw: function() {
   ctx.drawImage(ham, this.x, this.y, this.width, this.height); 
  }
};

function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ball.draw();
  hammer.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
  raf = window.requestAnimationFrame(draw);
  if (ball.y + ball.vy + ball.radius> canvas.height || ball.y + ball.vy -ball.radius < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx + ball.radius> canvas.width || ball.x + ball.vx - ball.radius < 0) {
    ball.vx = -ball.vx;
  }

}

canvas.addEventListener('mouseover', function(e) {
  raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener('mouseout', function(e) {
  window.cancelAnimationFrame(raf);
});

canvas.addEventListener('mousemove', function(e){
  hammer.x = e.clientX - 30
  hammer.y = e.clientY - 140
});

ball.draw();