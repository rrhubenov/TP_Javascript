function pendulumObject(element, ctx, time) {
  //line
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.moveTo(0,0);
  ctx.lineTo(0,190);
  ctx.closePath();
  ctx.strokeStyle = '#a29376';
  ctx.stroke();
  //circle 02
  ctx.beginPath();
  ctx.arc(0,225,35,2*Math.PI, 0);
  ctx.fillStyle = '#939598';
  ctx.fill();
  
  //ellipse
  ctx.beginPath();
  ctx.bezierCurveTo(-35,224,0,249,35,224);
  ctx.fill();
 
}

var rotate = Math.PI/180,
    maxRotate = 25*rotate,
    FREQUENCY = 0.6; //swings per second

function sint(time) {
    return Math.sin(FREQUENCY * time * Math.PI * 0.002); // 0.002 allow time in ms
}

function draw(time) {
  time = time === undefined ? performance.now() : time;
  
  var element = document.getElementById('canvas');
  var ctx = element.getContext('2d');
  
  ctx.setTransform(1,0,0,1,element.width*0.5,0);
  ctx.clearRect(-element.width*0.5,0,element.width,element.height);
  ctx.rotate(sint(time) * maxRotate);
  
  pendulumObject(element, ctx, time);
  
  window.requestAnimationFrame(draw);
}

window.onload = draw;
