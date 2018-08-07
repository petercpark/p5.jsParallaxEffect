//parallax mouse
var total = 2;

var fox;
var bg;

var xPos;
var yPos;
var divider = [5, 10];

var easing = 0.1;
var x = [];
var y = [];

function preload(){
	fox = loadImage('fox.png');
	bg = loadImage('background.jpeg');
}

function setup(){
var cnv = createCanvas(windowWidth, windowHeight);
cnv.style('display', 'block');

for (var i = 0; i < total; i++) {
	x[i] = width/2;
	y[i] = height/2;
}

}

function draw(){
	background(100);

	xPos = width/2 - (mouseX - width/2);
	yPos = height/2 - (mouseY - height/2);

	easeFunction();

	imageMode(CENTER);
	image(bg, x[0], y[0], width + 500, height + 500);
	image(fox, x[1], y[1]);
}

function easeFunction(){
	for (var i = 0; i < total; i++) {
	x[i] += (xPos / divider[i] - x) * easing;
	y[i] += (yPos / divider[i] - y) * easing;
 }
}