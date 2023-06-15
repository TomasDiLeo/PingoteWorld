let k = 8.99*(10**3);
let slider
let chargeUser
let spacing = 10
let button;
let pers = false

function setup() {
  createCanvas(500, 500);

  p1 = new Particle(width/2-width/4, height/2, -1);
  p2 = new Particle(width/2+width/4, height/2, 1);
  
  movableParticles = []
  particles = []
  particles.push(p1)
  particles.push(p2)
  
  slider = createSlider(-2, 2, 0,0.1);
  slider.position(80, 10);
  slider.style('width', '180px');
  
  button = createButton('Dibujar');
  button.position(10, 8);
  button.mousePressed(persistency);
  
  background(0);
}

function draw() {
  
  if(!pers){
    background(0);
  }
  
  textSize(18);
  fill(255)
  text('\'A\' para agregar', 350, 28);
  text(chargeUser + " µC", 270, 28);

  chargeUser = slider.value();
  
  potentialArray = arrayPotential(spacing)
  
  //drawPotentialArray(potentialArray, spacing)
  
  //drawVectorField()
  
  particles.forEach(function(particle){
    particle.update();
    particle.display();
  });
  
  index = 0
  movableParticles.forEach(function(particle){
    field = electricField(particle.pos.x, particle.pos.y)
    force = createVector(particle.q * field.x, particle.q * field.y)
    particle.applyForce(force)
    particle.update()
    particle.display()
    
    if(particle.pos.x > width || particle.pos.x < 0 || particle.pos.y > height || particle.pos.y < 0 || particle.vel.mag()>10){
      movableParticles.splice(index,1)
    }
       
    index++
  });
}

function persistency(){
  if(pers){
    pers = false
  }else{
    pers = true
  }
}

function drawPotentialArray(arr, spacing){
  for(let x = 0; x < arr.length; x++){
    for(let y = 0; y < arr[0].length; y++){
      let c = arr[x][y]
      fill(c.x, c.y, c.z)
      noStroke()
      square(x*spacing, y*spacing, spacing)
    } 
  }
}

function arrayPotential(spacing){
  arr = []
  for (let x = 0; x < height; x += spacing) {
    columnas = []
    for (let y = 0; y < width; y += spacing) {
      clor = potential(x, y)
      columnas.push(createVector(clor,0,-clor))
    }
    arr.push(columnas)
  }
  
  return arr
}


function drawVectorField() {
  const spacing = 20; // Spacing between points
  const arrowSize = 4; // Size of the arrowhead
  
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      const vector = electricField(x, y);
      
      // Normalize the vector
      vector.limit(1.5);
      
      // Calculate the position of the arrowhead
      const arrowheadX = x + vector.x * spacing * 0.5;
      const arrowheadY = y + vector.y * spacing * 0.5;
      
      // Draw the line and arrowhead
      let colorLine = mapPotential(potential(x,y))
      stroke(colorLine)
      strokeWeight(1)
      line(x, y, arrowheadX, arrowheadY);
      push();
      translate(arrowheadX, arrowheadY);
      rotate(vector.heading());
      fill(colorLine)
      triangle(-arrowSize, arrowSize / 4, 0, 0, -arrowSize, -arrowSize / 4);
      pop();
    }
  }
}

function mapPotential(p){
  return (-1/500)*(p-180)*(p+230)
}

function electricField(x, y){
  let Ef = createVector(0,0);
  for(var i = 0; i < particles.length; i++){
    let particle = particles[i];
    let r = dist(x, y, particle.pos.x, particle.pos.y)
    
      
    let Ex = ((k * particle.q * (x - particle.pos.x)) / r**3)
    let Ey = ((k * particle.q * (y - particle.pos.y)) / r**3)
    
    Ef = Ef.add(createVector(Ex, Ey));
  }
  return Ef;
}

function potential(x, y){
  let potential = 0
  for(var i = 0; i < particles.length; i++){
    let particle = particles[i];
    let r = dist(x, y, particle.pos.x, particle.pos.y)
    
      
    let p = ((k * particle.q) / r)
    
    potential = potential + p;
  }
  return potential
}

class MovableParticle{
  constructor(x,y,charge){
    this.pos = createVector(x,y)
    this.accel = createVector(0,0)
    this.vel = createVector(0,0)
    this.mass = 1
    this.q = charge;
    this.frictionCoefficient = 0.5
  }
  
  applyForce(force) {
    // Use Newton's second law: F = ma
    // Divide the force by the mass to calculate the acceleration
    const f = force.copy().div(this.mass);
    this.accel.add(f);
  }
  
  applyFriction() {
    // Calculate the friction force
    const friction = this.vel.copy();
    friction.mult(-1);
    //friction.normalize();
    friction.mult(this.frictionCoefficient);
    // Apply the friction force to the particle
    this.applyForce(friction);
  }
  
  update() {
    this.applyFriction()
    // Update the velocity and position of the particle based on acceleration
    this.vel.add(this.accel);
    this.pos.add(this.vel);
    // Reset the acceleration for the next frame
    this.accel.set(0, 0);
  }
  
  display(){
    noStroke()
    fill(150*this.vel.mag())
    
    circle(this.pos.x, this.pos.y, 2)
    line(this.pos.x - (this.size/3), this.pos.y, this.pos.x + (this.size/3), this.pos.y)
    if(this.q > 0){
      line(this.pos.x, this.pos.y - (this.size/3), this.pos.x , this.pos.y + (this.size/3)) 
    }
  }
}

class Particle{
  constructor(x, y, charge){
    this.interactDistance = 30
    this.movable = true
    this.size = 20
    this.pos = createVector(x, y);
    this.q = charge;
  }
  
  display(){
    stroke(0)
    if(this.q > 0){
      fill(230,80,80)
    }else{
      fill(80,75,240)
    }
    circle(this.pos.x, this.pos.y, this.size)
    line(this.pos.x - (this.size/3), this.pos.y, this.pos.x + (this.size/3), this.pos.y)
    if(this.q > 0){
      line(this.pos.x, this.pos.y - (this.size/3), this.pos.x , this.pos.y + (this.size/3)) 
    }
  }
  
  update(){
    var distance = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if(mouseIsPressed && distance < this.interactDistance && this.movable){
      this.pos = createVector(mouseX, mouseY)
      this.interactDistance = 100
    }else if(mouseIsPressed && distance > this.interactDistance){
      this.movable = false
    }else if(!mouseIsPressed){
      this.movable = true
      this.interactDistance = 30
    }
  }
}

function keyPressed() {
  if (keyCode === 65 && chargeUser != 0) {
    particles.push(new Particle(mouseX,mouseY, chargeUser))
  }
}

function mouseDragged(){
  for(let i = 0; i < 50;i++){
    movableParticles.push(new MovableParticle(mouseX + random(-100,100),mouseY + random(-100,100),random(-1,1)))
  }
}