let looping = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "./frames/logistic-map-5/logistic-map";
let maxFrames = Infinity;
let x, y;
let t, t2;
let drawCount = 0;
let startT = 0.00001;
let startT2 = 0.02;
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
let increment = 0.1 + (decrement * 200);

function setup() {
    socket = io.connect('http://localhost:8080');
    cnvs = createCanvas(windowWidth, windowWidth / 16 * 9);
    // cnvs = createCanvas(400, 400);
    ctx = cnvs.drawingContext;
    canvasDOM = document.getElementById('defaultCanvas0');
    frameRate(30);
    background(0);
    fill(255, 35);
    noStroke();
    t = 0;
    t2 = 0;
    if (!looping) {
        noLoop();
    }
}

let xCounter = 0;

function draw() {
    translate(10, -2675);
    if (drawCount > 62) {
        if (exporting && frameCount < maxFrames) {
            frameExport();
        }
        framesToPrints++;
        background(0);
        drawCount = 0;
        t = 0;
        t2 = 0;
        xCounter = 0;
        decrement *= 0.99;
        increment = 0.1 + (decrement * 200);
    }
    for (let k = 0; k < 200; k++) {
        let f = xCounter * 0.1;
        t = startT + increment;
        t2 = startT2 + increment;
        for (var i = 0; i < 600; i++) {
            t = logisticMap(t);
            t2 = logisticMap(t2);
            x = f;
            y = sin(t) * 6200;
            let y2 = sin(t2) * 1100;
            // ellipse(x, lerp(y, y2, 0), 0.5);
            let sinus = map(sin(framesToPrints * 0.025), -1, 1, 0, 1);
            rect(x, lerp(y, y2, 0), 0.5, 0.5);
        }
        // decrement += decrementAcceleration;
        increment -= decrement;
        xCounter++
    }
    drawCount++;
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