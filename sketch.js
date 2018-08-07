//loading elements
var loader;
var counter = 0;
var loading = true;
var totalFiles = 2;
var img = [];

//that little arrow thing at the bottom
var scrollImg;

//the parallax part
var xPos;
var yPos;
var speed = [15, 40, 10]; //the greater the speed the slower it is

//ease the element towards the mouse
var easing = 0.1;
var x = [];
var y = [];

//canvas
var cnv;

function preload(){
	loader = createImg('loadicon.gif');
	scrollImg = createImg('https://raw.githubusercontent.com/petercpark/p5.jsParallaxEffect/master/scroll.gif').size(100, 100);
	scrollImg.style('display', 'none');
}

function loadFiles(filename) {
  loadImage(filename, filesLoaded);

  function filesLoaded(file) {
    img.push(file);
    counter++;
    if (counter == totalFiles) {
      loading = false;
    }
  }
}

function setup(){
scrollImg.style('position', 'absolute');

for (var i = 0; i < speed.length; i++) {
	x[i] = 0;
	y[i] = 0;
}

loadFiles('https://raw.githubusercontent.com/petercpark/p5.jsParallaxEffect/master/background.jpg');
loadFiles('https://image.ibb.co/ds5trK/fox.png');

}

function draw(){
	cnv = createCanvas(windowWidth, windowHeight);
	cnv.style('display', 'block');

	if (loading) {
	background(255);
	loader.center();
	}

	else{
	loader.remove();
	background(0);
	easeFunction();

	imageMode(CENTER);
	image(img[0], width/2 - x[1], height/2 - y[1], width + 500, height + 500);
	image(img[1], width/3 - x[0], height/2 - y[0]);

	textAlign(CENTER);
	textSize(width/15);
	fill(255, 220, 200);
	textFont('Sedgwick Ave Display');
	text('Parallax p5.js', width * 2/3 - x[2], height/2 - y[2]);

	scrollImg.show();
	scrollImg.position(width/2 - 50, height - 100);
 }
}

function easeFunction(){
	xPos = (mouseX - width/2);
	yPos = (mouseY - height/2);

	for (var i = 0; i < speed.length; i++) {
	x[i] += (xPos / speed[i] - x[i]) * easing;
	y[i] += (yPos / speed[i] - y[i]) * easing;
 }
}

function mouseWheel(event){
	if(event.delta() > 0){

	}
}