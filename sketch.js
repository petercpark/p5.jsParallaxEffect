//loading elements
var counter = 0;
var loading = true;
var totalFiles = 3;
var bg;
var fox;
var octo;
var gitlogo;

//that little arrow thing at the bottom
var scrollImg;

//the parallax part
var xPos;
var yPos;//fox, bg, text, box
var speed = [10, 80, 30, 20]; //the greater the speed the slower it is

//ease the element towards the mouse
var easing = 0.3;
var x = [];
var y = [];
var heightY;
var heightYSpeed = 60;
var perc = 1;
var percSpeed = 0.1;
var timesChanged = 0;

var secondSlide = false;
var down = false;
var clicked = false;
var dx;
var dy;

//canvas
var cnv;

function preload(){
	bg = loadImage('https://raw.githubusercontent.com/petercpark/p5.jsParallaxEffect/master/background.jpg');
	fox = loadImage('https://raw.githubusercontent.com/petercpark/p5.jsParallaxEffect/master/fox.gif');
	octo = loadImage('https://raw.githubusercontent.com/petercpark/p5.jsParallaxEffect/master/Octocat.png');
	gitlogo = loadImage('https://raw.githubusercontent.com/petercpark/p5.jsParallaxEffect/master/github-logo.gif');
	scrollImg = createImg('https://raw.githubusercontent.com/petercpark/p5.jsParallaxEffect/master/scroll.gif').size(100, 100);
	scrollImg.style('display', 'none');
}

function setup(){
cnv = createCanvas(windowWidth, windowHeight);
cnv.style('display', 'block');
scrollImg.style('position', 'absolute');
heightY = height;

for (var i = 0; i < speed.length; i++) {
	x[i] = 0;
	y[i] = 0;
}
}

function draw(){
	background(255);
	easeFunction();

	imageMode(CENTER);
	//background image
	image(bg, width/2 - x[1], height/2 - y[1], width + 500, height + 500);

	//if it is the first slide
	if(secondSlide == false){
	//also if it's never scrolled down
	if (down == false) {
	firstFrame(width, height, 1);
	}
	//also if it has scrolled down and wants to scroll back up
	if (down) {
	if(perc <= 1){perc += percSpeed;}
	heightY += heightYSpeed;
	firstFrame(width, heightY, perc);
	secondFrame(width, height - heightY/4, 1 - perc);
	timesChanged--;
	if (timesChanged == 0) {
		down = false;
	  }
	 }
	}

  	//if it is the second slide
  	if (secondSlide) {
  	//also if the opacity is not 0
  	if (perc >= 0) {
  	perc -= percSpeed;
  	heightY -= heightYSpeed;
  	timesChanged++;
  }
  	//if it has passed -height
  	else{
  	down = true;
  	}
  	//move firstFrame and secondFrame up to hide and show respectively
  	firstFrame(width, heightY, perc);
  	secondFrame(width, height - heightY/4, 1 - perc);
  }
}

function easeFunction(){
	xPos = mouseX - width/2;
	yPos = mouseY - height/2;

	for (var i = 0; i < speed.length; i++) {
	x[i] += (xPos / speed[i] - x[i]) * easing;
	y[i] += (yPos / speed[i] - y[i]) * easing;
 }
}

function mouseWheel(event){
	if(event.delta > 0){
		//scroll down
		secondSlide = true;
	}
	else if(event.delta < 0){
		//scroll up
		secondSlide = false;
	}
}

function firstFrame(w, h, o){
	//parallax pg.js
	textAlign(CENTER);
	textSize(75);
	fill(25, 255 * o);
	textFont('Sedgwick Ave Display');
	text('Parallax p5.js', w * 6.2/10 - x[2], h/2 - y[2]);

	//fox image
	tint(255, 255 * o);
	image(fox, w * 1/3- x[0], h/2 - y[0], 500, 500);
	noTint();

	//that arrow thing at the bottom
	scrollImg.show();
	scrollImg.position(w/2 - 50, height - 100);
	if(down){
	scrollImg.style('transform', 'rotate(180deg)');
	}
	if(timesChanged == 1){
	scrollImg.style('transform', 'rotate(0deg)');
	}
}

function secondFrame(w, h, o){
	dx = w * 1/4 - x[3];
	dy = h/2+50 - y[3];
	//text
	textAlign(CENTER);
	textSize(75);
	fill(178, 68, 229, 255 * o);
	textFont('Sedgwick Ave Display');
	text('See it on Github', w * 2/5 - x[2], h/2 - y[2]);
	//octocat
	tint(255, 255*o);
	image(octo, w * 2/3 - x[0], h/2 - y[0], octo.width * 3/4, octo.height * 3/4);
	noTint();
	//button
	fill(244, 84, 33, 255*o);
	noStroke();
	//if mouse hover over rect
	if (mouseX > dx && mouseX < dx+200 && mouseY > dy && mouseY < dy+100) {
	fill(234, 56, 0, 255*o);
	if (clicked) {
		window.open('https://github.com/petercpark/p5.jsParallaxEffect');
		clicked = false;
	}
	}
	var button = rect(dx, dy, 200, 100, 20);
	//github logo
	tint(255, 255*o);
	image(gitlogo, dx + 100, dy + 50, 50, 50);
	noTint();
}

function mouseClicked(){
	if (second && mouseX > dx && mouseX < dx+200 && mouseY > dy && mouseY < dy+100) {
		clicked = true;
	}
}