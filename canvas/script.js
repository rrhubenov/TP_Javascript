var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth - 50;
ctx.canvas.height = window.innerHeight - 50;
var raf;
document.body.style.backgroundColor = "white";
var gun = new Image();
DrawWeapon = function(){
  gun.src = 'https://t1.rbxcdn.com/23678b437e11f8c47fc3b88681c13bc4';  
}


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

var Weapon = {
  x: 200,
  y: 480,
  width: 150,
  height: 150,
  xv: 0,
  yv: 0,
	rightPressed: false,
	leftPressed: false,
  draw: function() {
   ctx.drawImage(gun, this.x, this.y, this.width, this.height); 
  }
};

var Bullet = {
	radius: 5,
	x: Weapon.x + 80,
	y: Weapon.y,
	//width: 30,
	//heigt: 30,
	xv: 0 ,
	yv: -5,
	color: 'red',
	keyPressed: false,
	draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },

};

function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ball.draw();
  Weapon.draw();
  Bullet.draw();
  //Bullet.x += Bullet.xv;
  Bullet.y += Bullet.yv;
  ball.x += ball.vx;
  ball.y += ball.vy;
  raf = window.requestAnimationFrame(draw);
  if (ball.y + ball.vy + ball.radius> canvas.height || ball.y + ball.vy -ball.radius < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx + ball.radius> canvas.width || ball.x + ball.vx - ball.radius < 0) {
    ball.vx = -ball.vx;
  }
	if(Weapon.rightPressed && Weapon.x < canvas.width - Weapon.width) {
    Weapon.x += 7;
  }
  else if(Weapon.leftPressed && Weapon.x > 0) {
  	Weapon.x -= 7;
  }
  if(Bullet.keyPressed) {
  	Bullet.draw();
  	Bullet.y += Bullet.yv;
  	//Bullet.keyPressed = false;
  }
}

canvas.addEventListener('mouseover', function(e) {
  raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener('mouseout', function(e) {
  window.cancelAnimationFrame(raf);
});

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//canvas.addEventListener('click', weaponFire, false);


function keyDownHandler(e) {
    if(e.keyCode == 39) {
        Weapon.rightPressed = true;
    }
    else if(e.keyCode == 37) {
        Weapon.leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        Weapon.rightPressed = false;
    }
    else if(e.keyCode == 37) {
        Weapon.leftPressed = false;
    }
}

/*function weaponFire(e) {
	if(e.keyCode == 32) {
	 Bullet.keyPressed = true;
	 console.log('ajdee');
	}
}
*/
ball.draw();
