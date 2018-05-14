let looping = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "./frames/logistic-map-9/logistic-map";
let maxFrames = Infinity;
let x;
let y;
let t, t2;
let drawCount = 0;
let startT = 0.00001;
let startT2 = 0.5;
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

// 3.569946
let framesToPrints = 0;
// let decrementAcceleration = 0.000001;
let decrement = 0.000001;
decrement = 0.000001 * Math.pow(0.99, 550);
// decrement = 0.000005;
let increment = 0.1 + (decrement * 200);
let mapDecrement;

function setup() {
    socket = io.connect('http://localhost:8080');
    cnvs = createCanvas(windowWidth, windowWidth / 16 * 9);
    // cnvs = createCanvas(400, 400);
    ctx = cnvs.drawingContext;
    canvasDOM = document.getElementById('defaultCanvas0');
    frameRate(30);
    background(0);
    fill(255, 45);
    noStroke();
    x = width / 2;
    t = 0;
    t2 = 0;
    if (!looping) {
        noLoop();
    }
    mapDecrement = map(Math.abs(decrement), 0.000001 * 0.99, 0.000001 * Math.pow(0.99, 2500), 0.75, 1.25);
}

let xCounter = 0;
let xShifter = 1;

function draw() {
    // translate(10, -2675);
    if (drawCount > 31) {
        xShifter *= -1;
        increment = 0.1 + (decrement * 200);
        decrement *= -1;
        x = width / 2;
        drawCount = 0;
    } else if (drawCount < -31) {
        if (exporting && frameCount < maxFrames) {
            frameExport();
        }
        xShifter *= -1;
        decrement *= -1;
        framesToPrints++;
        background(0);
        drawCount = 0;
        t = 0;
        x = width / 2;
        xCounter = 0;
        decrement *= 0.99;
        increment = 0.1 + (decrement * 200);

    }
    for (let k = 0; k < 200; k++) {
        t = startT + increment;
        t2 = startT2 + increment;
        mapDecrement = map(Math.abs(decrement), 0.000001 * 0.99, 0.000001 * Math.pow(0.99, 2500), 0.75, 1.25);
        for (var i = 0; i < 150 * mapDecrement; i++) {
            t = logisticMap(t);
            t2 = logisticMap(Math.pow(t2, t));
            y = sin(t) * 6200;
            let y2 = -100 + sin(t2) * 1200;
            y2 = -698 + sin(t2) * 2100;

            rect(x, y2, 0.5, 0.5);
        }
        increment -= decrement;
        x += xShifter * 0.1;
    }
    drawCount += xShifter;
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