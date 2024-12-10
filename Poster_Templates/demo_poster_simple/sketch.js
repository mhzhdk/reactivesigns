
let gridCountX = 16;

let gridCountY = 56;


let gridArray = Array(gridCountX).fill().map(()=> Array(gridCountY).fill(null));

let triangleList = []

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


 noStroke();

 for(let i = 0; i<triangleList.length; i++) {

   triangleList[i].display();

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

   this.i = i;

   this.j = j;

   this.w = width/gridCountX; 

   this.h = height/gridCountY; 

   this.x = i * this.w;

   this.y = j * this.h;  

   this.active = false;

 }

 

 display(){

   if (this.active == true) {

     fill(0);

     gridArray[this.i][this.j] = 0;

   } else {

     fill(255);

     gridArray[this.i][this.j] = 1;

   }

   this.showTriangle();

 }


 showTriangle(){

   //  rect(this.x,this.y,this.w,this.h)

   push();

   translate(this.x,this.y)


   let isWhite = numberThree.some(item => item[0] === this.i && item[1] === this.j);


   // Set color based on whether the triangle should be white

   if (isWhite) {

     fill(0); // white

   } else {

     fill(255); // black

   }


   // work out the orientation of the triangle based on column and row. 

   let invert = this.i%2

   invert -= this.j%2

   // draw

   if (invert) {

   triangle(0, this.h/2, this.w, 0-(this.h/2), this.w, this.h+(this.h/2));

   } else {

   triangle(0, 0-(this.h/2), this.w, this.h/2, 0, this.h+(this.h/2));

   }

   pop();

 }

 

}

