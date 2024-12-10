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

 for(let i = 0; i<triangleList.length; i++) {

   triangleList[i].display();}


 /*important!*/ poster.posterTasks(); // do not remove this last line! 

}


function keyPressed() 
{
 if (keyCode === ENTER) 
  {

   console.log("[");

     for(let t = 0; t<triangleList.length; t++) 
    {

         let tri = triangleList[t];

         if (tri.active == true) 
          {

         let i = tri.i;

         let j = tri.j;

         console.log("["+i+","+j+"]"); 

           if (t<triangleList.length-1) 
            {

             console.log(","); 

            }

       }
    }
    console.log("]");
 }

}

class TesoTriangle 
{

 constructor(i,j,w,h) 
  {

   this.i = i;

   this.j = j;

   this.w = width/gridCountX; 

   this.h = height/gridCountY; 

   this.x = i * this.w;

   this.y = j * this.h;  

   this.active = false;

 }

 

 display()
 {

       let distance = dist(this.x+this.w/2,this.y+this.h/2, mouseX, mouseY)

       if (distance < this.w/2) 
        {

         this.active = true;

       } 

       if (this.active == true) 
        {

         fill(0)

         gridArray[this.i][this.j] = 0;

       } else 
       {

         fill(255)

         gridArray[this.i][this.j] = 1;

       }

   this.showTriangle()
   this.drawParallelLines();

 }

 showTriangle()
 {

   push();

   translate(this.x,this.y)

   // work out the orientation of the triangle based on column and row. 

   let invert = this.i%2

   invert -= this.j%2

   // draw

   if (invert) 
    {

   triangle(0, this.h/2, this.w, 0-(this.h/2), this.w, this.h+(this.h/2));

   } else 
   {

   triangle(0, 0-(this.h/2), this.w, this.h/2, 0, this.h+(this.h/2));

   }

   pop();
  }

   drawParallelLines()
   {
    let m = -(this.w / 2); // Example slope value
    let slider = map(mouseX, 0, width, -100, 100);
    let parallelStart = createVector(this.x + slider, this.y + slider);

    let deltaX = 120; // Arbitrary horizontal shift for the parallel line
    let deltaY = m * deltaX; // Calculate the vertical shift based on the slope
    let parallelEnd = createVector(parallelStart.x + deltaX, parallelStart.y + deltaY);

    // Draw the rectangles (offsets will adjust their position)
    push();
    for (let i = 0; i < 5; i++) 
    {
      if (i % 2 === 0) 
      {
        fill(255); // Adjust the fill based on condition
      } else {
        fill(255); // Adjust the fill based on condition
      }
      this.drawRectis(parallelStart.x - i * offset, parallelStart.y + i * offset, parallelEnd.x - i * offset, parallelEnd.y + i * offset);
    }
    pop();
  }

  drawRectis(xx, yy, xe, ye) {
    beginShape();
    vertex(xx, yy);
    vertex(xe, ye);
    vertex(xe - 40, ye - 10);
    vertex(xx - 40, yy - 10);
    endShape(CLOSE);
  }
}
 
 

 



