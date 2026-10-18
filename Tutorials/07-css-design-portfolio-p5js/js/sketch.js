
let canvas;
let xPos = 0;
let yPos = 0;
let easing = 0.2;


function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", 10);
    // background(225);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function draw() {
    clear();

    xPos = xPos + ((mouseX - xPos) * easing);
    yPos = yPos + ((mouseY - yPos) * easing);


    drwaStuff(xPos, yPos);


}


function drwaStuff(_x, _y) {

    noFill();
    strokeWeight(1);

    stroke(random(255), random(255), random(255));
    ellipse(_x - 20, _y, 30, 30);

    stroke(random(255), random(255), random(255));
    ellipse(_x + 20, _y, 35, 20);
}