function setup() {
   createCanvas(700, 700);

   world = new Pan();

   //world.setRatio(-  1);
   world.setDrag("a");   
}

function draw() {
   background(255);

   world.update();

   fill(255, 76, 94, 255)
   ellipse(100, 100, 50, 50);
   ellipse(200, 50, 20, 70);
}

// function mousePressed() {
//    console.log("TESYE")
// }