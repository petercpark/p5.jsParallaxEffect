//parallax p5.js code
var img = [];

var scroll;

var xPos;
var yPos;

//the greater the speed the slower it is
var speed = [20, 50, 10];

var easing = 0.1;
var x = [];
var y = [];

var cnv;

function preload(){
	img[0] = loadImage('https://raw.githubusercontent.com/petercpark/p5.jsParallaxEffect/master/background.jpg');
	img[1] = loadImage('https://image.ibb.co/ds5trK/fox.png');
	scroll = createImg('https://raw.githubusercontent.com/petercpark/p5.jsParallaxEffect/master/scroll.gif').size(100, 100);
}

function setup(){
scroll.style('position', 'absolute');

for (var i = 0; i < speed.length; i++) {
	x[i] = 0;
	y[i] = 0;
}

}

function draw(){
	cnv = createCanvas(windowWidth, windowHeight);
	cnv.style('display', 'block');

	background(0);

	xPos = (mouseX - width/2);
	yPos = (mouseY - height/2);

	easeFunction();

	imageMode(CENTER);
	image(img[0], width/2 + x[1], height/2, width + 500, height + 500);
	image(img[1], width/3 + x[0], height/2 + y[0]);

	textAlign(CENTER);
	textSize(width/15);
	fill(255, 220, 200);
	textFont('Sedgwick Ave Display');
	text('Parallax p5.js', width * 2/3 + x[2], height/2 + y[2]);

	scroll.position(width/2 - 50, height - 100);
}

function easeFunction(){
	for (var i = 0; i < speed.length; i++) {
	x[i] += (xPos / speed[i] - x[i]) * easing;
	y[i] += (yPos / speed[i] - y[i]) * easing;
 }
}

function mouseWheel(event){
	
}