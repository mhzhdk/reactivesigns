
let gridCountX = 16;
let gridCountY = 56;
let offset = 5;

let gridArray = Array(gridCountX).fill().map(()=> Array(gridCountY).fill(null));

let triangleList = [] // this stores the actual TesoTriangle objects

function setup() {

 /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line.
  /*important!*/ poster.setup(this, "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line.
 createCanvas(1050/2, 1920/2);
 background(100);

 

 for(let i = 0; i<gridCountX; i++) {

     for(let j = 0; j<gridCountY; j++) {

         gridArray[i][j] = 0;

         triangleList.push(new TesoTriangle(i,j)); 

   }

 }

}


function draw() {
// noStroke(); // IN REALIT
stroke(255); // TO HELP

 for(let i = 0; i<triangleList.length; i++) {

   triangleList[i].showTriangle();

 }


 /*important!*/ poster.posterTasks(); // do not remove this last line! 

}


function keyPressed() {

 if (keyCode === ENTER) {

   console.log("[");

     for(let t = 0; t<triangleList.length; t++) {

         let tri = triangleList[t];

         if (tri.active == true) {

         let i = tri.i;

         let j = tri.j;

         console.log("["+i+","+j+"]"); 

           if (t<triangleList.length-1) {

             console.log(","); 

           }

       }

 }

     console.log("]");

 }

}


class TesoTriangle {

 constructor(i,j,w,h) {

   this.i = i; //row and column
   this.j = j;

   this.w = width/gridCountX; // width and height -> dependant on canvas size
   this.h = height/gridCountY; 

   this.x = i * this.w; // top left corver coordinates of triangle
   this.y = j * this.h;  

   this.active = false; // boolean to determine color

 }

 
 showTriangle()
 {

   push(); // for every triangle new settingBase

   translate(this.x,this.y)

//calling the number arrays to color them
   let isWhite = numberThree.some(item => item[0] === this.i && item[1] === this.j);
   if (isWhite) {fill(0); } else {fill(255);} //coloring the numbers


   // work out the orientation of the triangle based on column and row. 
   // checks if odd or even
   let invert = this.i%2
   invert -= this.j%2


let slider = map(mouseX,0,width,-10,10)
   // draw
   if (invert) {

let p1 = createVector(0, this.h/2);
let p2 = createVector(this.w, 0-(this.h/2))
let p3 = createVector(this.w, this.h+(this.h/2))

let m = (p2.y-p1.y)/(p2.x-p1.x)

let parallelStart = createVector(p1.x+slider, p3.y+slider);

let deltaX = 20
let deltaY = m * deltaX
let parallelEnd = createVector(parallelStart.x + deltaX, parallelStart.y +deltaY)

let rectWidth = (parallelEnd.x - parallelStart.x)/2;
let rectHeight = (parallelEnd.y - parallelStart.y)/2;

triangle(p1.x,p1.y,p2.x,p2.y,p3.x,p3.y)


canvas.getContext("2d").clip()

for(let i=0; i<10; i++){
  push()
  if(i%2==0){fill(255,0,0) }else{fill(0,255,0)}   // MODULO HERE
  this.drawRectis(parallelStart.x - i * rectWidth, parallelStart.y + i * rectHeight, parallelEnd.x - i * rectWidth, parallelEnd.y + i * rectHeight);
  pop()
}

  

   } else {
let p4 = createVector(0, 0-(this.h/2))
let p5 = createVector(this.w, this.h/2)
let p6 = createVector(0, this.h+(this.h/2))

let m = -(p5.y-p4.y)/(p5.x-p4.x)
let parallelStart = createVector(p4.x-20, p4.y);

let deltaX = 200
let deltaY = m * deltaX
let parallelEnd = createVector(parallelStart.x + deltaX, parallelStart.y +deltaY)

   triangle(p4.x,p4.y, p5.x,p5.y,p6.x,p6.y);

   }

   pop();

 }




 drawRectis(xx,yy,xe,ye)
 {
  push()
  noStroke();
  beginShape();
  vertex(xx,yy);
  vertex(xe,ye);
  vertex (xe-80,ye-40);
  vertex(xx-80,yy-40)
  endShape(CLOSE)
  pop()
}


}


