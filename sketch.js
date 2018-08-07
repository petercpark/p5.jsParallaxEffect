//parallax mouse
var fox;
var bg;

var xPos;
var yPos;
var divider = [5, 20];

var easing = 0.1;
var x = [];
var y = [];

function preload(){
	fox = loadImage('https://image.ibb.co/ds5trK/fox.png');
	bg = loadImage('https://raw.githubusercontent.com/petercpark/p5.jsParallaxEffect/master/background.jpg');
}

function setup(){
var cnv = createCanvas(windowWidth, windowHeight);
cnv.style('display', 'block');

for (var i = 0; i < divider.length; i++) {
	x[i] = 0;
	y[i] = 0;
}

}

function draw(){
	background(0);

	xPos = (mouseX - width/2);
	yPos = (mouseY - height/2);

	easeFunction();

	imageMode(CENTER);
	image(bg, width/2 + x[1], height/2 + y[1], bg.width * 4/3, bg.height * 4/3);
	image(fox, width/2 + x[0], height/2 + y[0]);
}

function easeFunction(){
	for (var i = 0; i < divider.length; i++) {
	x[i] += (xPos / divider[i] - x[i]) * easing;
	y[i] += (yPos / divider[i] - y[i]) * easing;
 }
}