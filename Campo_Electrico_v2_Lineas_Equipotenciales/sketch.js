let k = 8.99*(10**3);
let slider
let chargeUser
let button

function setup() {
  createCanvas(700, 700);
  p1 = new Particle(width/4, height/2, 1);
  p2 = new Particle(width - width/4, height/2, -1);
  
  particles = []
  particles.push(p1)
  particles.push(p2)
  
  slider = createSlider(-2, 2, 0,0.1);
  slider.position(100, 10);
  slider.style('width', '190px');
  
  button = createButton('Dibujar');
  button.position(10, 10);
  button.mousePressed(boton);
  background(0);
}

function mouseDragged(){
  
  background(0)
}

function draw() {
  chargeUser = slider.value();

  textSize(20);
  fill(255)
  text('\'A\' para agregar', 520, 28);

  text(chargeUser + " µC", 320, 28);
  
  
  //drawPotential();
  //drawVectorField()
  
  particles.forEach(function(particle){
    particle.display();
    particle.update();
  });
  
}

function boton(){
  doScheduleThings();
}

function doScheduleThings()
{
  sleep(10).then(function() {
    textSize(50);
    fill(255);
    text('Cargando...', width/2 -120, height/2);
  })
  sleep(1000).then(function() {
    drawPotential();
  })
}

function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}

function drawPotential(){
  background(0);
  const spacing = 0.8; // Spacing between points
  
  fill(255)
  stroke(0)
  strokeWeight(0)
  
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      clr = potential(x,y)
      if(sin(80 * Math.tanh(0.015 * abs(clr))) > 0.95){
        square(x,y,spacing)
      }
    }
  }
}

function drawVectorField() {
  const spacing = 20; // Spacing between points
  const arrowSize = 5; // Size of the arrowhead
  
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
      line(x, y, arrowheadX, arrowheadY);
      push();
      translate(arrowheadX, arrowheadY);
      rotate(vector.heading());
      fill(colorLine)
      triangle(-arrowSize, arrowSize / 2, 0, 0, -arrowSize, -arrowSize / 2);
      pop();
    }
  }
}

function mapPotential(p){
  return (-1/100)*(p-100)*(p+100)
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

class Particle{
  constructor(x, y, charge){
    this.interactDistance = 30
    this.movable = true
    this.size = 20
    this.pos = createVector(x, y);
    this.q = charge;
  }
  
  display(){
    strokeWeight(1)
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

