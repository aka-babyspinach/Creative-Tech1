class Boid {


    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();//give you a random velocity factor, unified number with different directions
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = 1; //the smaller number the faster, the bigger less sticky, bigger movements
        this.maxSpeed = 4;

        let ad = random(ads);
        this.ads = ad;
        this.w = random(30, 60);
    }



    edges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }



    //figure out how individual boid detect the direction of other boids around it and reconfigure its own direction
    align(boids) {

        let perceptionRadius = 50;
        let steering = createVector(); //desired direction
        let total = 0; //total number in the distance

        for (let other of boids) {
            //distance between thiss boid and other boids
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);

            //as long as other is not me and distance <100
            if (other != this && d < perceptionRadius) {
                steering.add(other.velocity);
                //average the velocity of the boids around
                total++;
            }
        }

        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);//speed - velocity = acceleration
            steering.limit(this.maxForce); //F = MA, we assume M is 1, so F = A
        }
        return steering; // return outside the function
    }


    // add separation so they dont all converge to one spot
    separation(boids) {

        let perceptionRadius = 50;//how big the flock you want it to be smaller number more tiny flocks 
        let steering = createVector(); //desired direction
        let total = 0;

        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);

            if (other != this && d < perceptionRadius) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d); //divide by distance or div(d)
                steering.add(diff);
                //average the velocity of the boids around
                total++;
            }
        }

        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);//speed - velocity = acceleration
            steering.limit(this.maxForce); //F = MA, we assume M is 1, so F = A
        }
        return steering; // return outside the function
    }



    cohesion(boids) {

        let perceptionRadius = 30;//how big the flock you want it to be smaller number more tiny flocks 
        let steering = createVector(); //desired direction
        let total = 0; //total number in the distance

        for (let other of boids) {
            //distance between thiss boid and other boids
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);

            //as long as other is not me and distance <100
            if (other != this && d < perceptionRadius) {
                steering.add(other.position);
                //average the velocity of the boids around
                total++;
            }
        }

        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);//speed - velocity = acceleration
            steering.limit(this.maxForce); //F = MA, we assume M is 1, so F = A
        }
        return steering; // return outside the function
    }



    flock(boids) {
        this.acceleration.set(0, 0);//or this.accelration.mult(0);
        let alignment = this.align(boids); //forcce acccumulation
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);

        separation.mult(value2);
        //separation.mult(separationSlider.value());
        cohesion.mult(value1);
        //cohesion.mult(cohesionSlider.value());
        alignment.mult(alignSlider.value());


        this.acceleration.add(separation);
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);

    }



    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.set(0, 0);
    }



    show() {
        strokeWeight(8);
        stroke(255);
        image(this.ads, this.position.x, this.position.y, this.w, this.w * 1.485);
        //point(this.position.x, this.position.y)
    }
} 
