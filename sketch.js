let sort = [];
let arr = [];
let i = 0;
let j = 0;
let size;
let counter = 0;
let b1;
let b2;
let b3;
let b4;
let b5;
let down = false;
let firstRun = true;

function setup() {
	sort = [];
	arr = [];
	i = 0;
	j = 0;

	createCanvas(801, 700);

	b2 = createButton('Slow Down');
	b2.position(10, 50);
	b2.size(100, 35);
	b3 = createButton('Speed Up');
	b3.position(10, 90);
	b3.size(100, 35);
	b4 = createButton('Drop Down');
	b4.position(120, 50);
	b4.size(100, 35);
	b5 = createButton('Center');
	b5.position(120, 90);
	b5.size(100, 35);
	size = Math.floor(random(16, 32));

	for(let i = 0; i < size; i++) {
		arr[i] = random(5, 499);
		sort[i] = new bar(i * width/size);
		sort[i].height = arr[i];
		sort[i].tall = height - sort[i].height - 1;
	}
	loop();
}

function draw() {
	b2.mousePressed(slowDown);
	b3.mousePressed(speedUp);
	b4.mousePressed(dropDown);
	b5.mousePressed(center);
	let a = arr[j];
	let b = arr[j + 1];
	if(a > b) {

		let r = arr[j];
		arr[j] = arr[j + 1];
		arr[j + 1] = r;

		let b = sort[j].tall;
		let h = sort[j].height;
		sort[j].tall = sort[j + 1].tall;
		sort[j].height = sort[j + 1].height;
		sort[j + 1].tall = b;
		sort[j + 1].height = h;
	}
	j += 1;


	if(j >= arr.length - i - 1) {
		j = 0;
		i++;
		if(i < arr.length) {
			sort[arr.length - i].sorted = true;
		}
	}

	if(i >= arr.length) {
		sort[0].sorted = true;
		if(counter < 10) {
			counter++;
			noLoop();
			setTimeout(setup, 2000);
		} else {
			b1 = createButton("Reset");
			b1.size(100, 35);
			b1.position(10, 135);
		 	b1.mousePressed(restart);
			noLoop();
		}
	}

	background(0);
	for(let i = 0; i < arr.length; i++) {
		sort[i].show();
	}
	fill(255);
	textSize(35);

	text('Loop# ' + (counter - 1) + '/' + '10', 10, 30);
}

function bar(x) {
	this.x = x;
	this.y = height;
	this.height = 0;
	this.tall = 0;
	this.sorted = false;
	this.down = false;

	this.show = function() {
		if(this.sorted) {
			fill(0, 255, 0);
		}	else if(this.picked) {
			fill(150, 0, 0);
		} else {
		 fill(255);
	 }
	 if(down) {
		 rect(this.x, this.tall, width/size, this.height);
	 } else {
		 rect(this.x, height/2 - (this.height/2), width/size, this.height);
	 }
	}
}

function restart() {
	counter = 0;
	setup();
}

function slowDown() {
	frameRate(20);
}

function speedUp() {
	frameRate(120);
}

function dropDown() {
	down = true;
}

function center() {
	down = false;
}
