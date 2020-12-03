const flock = [];
let alignSlider, cohesionSlider, separationSlider;



function setup() {
    createCanvas(800, 720);
    alignSlider = createSlider(0, 5, 1, 0.1); //(slider min value, slider max value, starter value, increrment value)
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);
    for (let i = 0; i < 100; i++) {
        flock.push(new Boid());
    }
}


function draw() {
    background(200);

    //for every boid in the flock, delcare boid in for loop
    for (let boid of flock) {
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();

    }
}
