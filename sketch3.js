let looping = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "./frames/logistic-map";
let maxFrames = 700;
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
let increment = 0;
// 3.569946

function setup() {
    socket = io.connect('http://localhost:8080');
    cnvs = createCanvas(windowWidth, windowWidth / 16 * 9);
    ctx = cnvs.drawingContext;
    canvasDOM = document.getElementById('defaultCanvas0');
    frameRate(30);
    background(255);
    fill(0, 20);
    noStroke();
    if (!looping) {
        noLoop();
    }
}

function draw() {
    // translate(0, -height / 3);
    translate(0, -90);
    // scale(2, 2);
    for (let k = 0; k < 1; k++) {
        for (let j = 0; j < 20; j++) {
            let f = drawCount * 0.5;
            t = startT + increment;
            t2 = startT2 + increment;
            // background(0, 50);
            // ellipse(0, 0, 10);
            // translate(width * 0.5, height * 0.5);
            for (var i = 0; i < 100; i++) {
                t = logisticMap(t);
                t2 = logisticMap(t2);
                x = sin(t2) * f;
                // x = f;
                y = sin(t) * 9000;
                // y = sin(t * t2) * 1100;
                let y2 = sin(t * t2) * 1100;
                // y2 = sin(t) * 1100;
                ellipse(x, y2, 0.5);
            }
            increment += 0.00001;
        }
        drawCount++;
    }
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