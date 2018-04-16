let looping = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "./frames/logistic-map";
let maxFrames = 700;
let x, y;
let startX = 0.0001;
let startY = 0.0002;
// startX = 0.000001;
// startY = 0.0000011;
let r = 3.58;
r = 3.58;
// r = 4;
// r = 3.6;
// r = 3.65;
// r = 3.2;
// r = 3.59;
let increment = 0;
// 3.569946

function setup() {
    socket = io.connect('http://localhost:8080');
    cnvs = createCanvas(windowWidth / 16 * 9, windowWidth / 16 * 9);
    ctx = cnvs.drawingContext;
    canvasDOM = document.getElementById('defaultCanvas0');
    frameRate(30);
    background(0);
    fill(255, 255);
    noStroke();
    if (!looping) {
        noLoop();
    }
}

function draw() {
    x = startX + increment;
    y = startY + increment;
    // x = cos(frameCount * 0.00001);
    // y = sin(frameCount * 0.00001);
    background(0);
    // translate((width / 2) - 400, (height / 2) - 400);
    translate(-320, -320);
    for (var i = 0; i < 1000; i++) {
        ellipse(x * 1100, y * 1100, 2);
        x = logisticMap(x);
        y = logisticMap(y);
    }
    increment += 0.000001;
    // increment += 0.0001;
    if (exporting && frameCount < maxFrames) {
        frameExport();
    }
}

function logisticMap(n) {
    return r * n * (1 - n);
}

function keyPressed() {
    if (keyCode === 32) {
        if (looping) {
            noLoop();
            looping = false;
        } else {
            loop();
            looping = true;
        }
    }
    if (key == 'p' || key == 'P') {
        frameExport(p);
    }
    if (key == 'r' || key == 'R') {
        window.location.reload();
    }
}