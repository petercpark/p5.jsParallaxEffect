//DO TINT FOR FADE IN AND OUT
//FIGURE OUT HOW TO MAKE THE IMAGES SLIDE BACK IN WHEN SCROLL UP


//loading elements
var loader;
var counter = 0;
var loading = true;
var totalFiles = 3;
var img = [];

//that little arrow thing at the bottom
var scrollImg;

//the parallax part
var xPos;
var yPos;//text, bg, fox, box
var speed = [20, 80, 25, 15]; //the greater the speed the slower it is

//ease the element towards the mouse
var easing = 0.3;
var x = [];
var y = [];
var heightY;
var heightYSpeed = 70;
var perc = 1;
var percSpeed = 0.1;
var timesChanged = 0;

var secondSlide = false;
var down = false;

//canvas
var cnv;

function preload(){
	loader = createImg('loadicon.gif');
	scrollImg = createImg('https://raw.githubusercontent.com/petercpark/p5.jsParallaxEffect/master/scroll.gif').size(100, 100);
	scrollImg.style('display', 'none');
}

function loadFiles(filename, i) {
  loadImage(filename, filesLoaded);

  function filesLoaded(file) {
    img[i] = file;
    counter++;
    if (counter == totalFiles) {
      loading = false;
    }
  }
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
loadFiles('https://raw.githubusercontent.com/petercpark/p5.jsParallaxEffect/master/background.jpg', 0);
loadFiles('https://raw.githubusercontent.com/petercpark/p5.jsParallaxEffect/master/fox.gif', 1);
loadFiles('https://raw.githubusercontent.com/petercpark/p5.jsParallaxEffect/master/Octocat.png', 2);

}

function draw(){
	if (loading) {
	background(255);
	loader.center();
	}

	else{
	loader.remove();
	background(255);
	easeFunction();

	imageMode(CENTER);
	//background image
	image(img[0], width/2 - x[1], height/2 - y[1], width + 500, height + 500);

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
	secondFrame(width, heightY+height*3/4, 1 - perc);
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
  	secondFrame(width, heightY+height*3/4, 1 - perc);
  }
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
	textSize(w/15);
	fill(25, 255 * o);
	textFont('Sedgwick Ave Display');
	text('Parallax p5.js', w * 6.2/10 - x[2], h/2 - y[2]);

	//fox image
	tint(255, 255 * o);
	image(img[1], w/3.3- x[0], h/2 - y[0]);
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
	textAlign(CENTER);
	textSize(w/15);
	fill(178, 68, 229, 255 * o);
	textFont('Sedgwick Ave Display');
	text('Download on Github', w * 2/5 - x[2], h/2 - y[2]);

	tint(255, 255*o);
	image(img[2], w * 3/4 - x[0], h/2 - y[0], img[2].width * 3/4, img[2].height * 3/4);
	noTint();

	fill(244, 110, 66, 255*o);
	noStroke();
	rect(w * 1/5 - x[3], h/2+50 - y[3], 200, 100, 20);
}