
let gridCountX = 16;
let gridCountY = 56;
let offset = 3;


let gridArray = Array(gridCountX).fill().map(()=> Array(gridCountY).fill(null));


let triangleList = [] // this stores the actual TesoTriangle objects
let isBlackTriangles = []; //
let counter = 0;

function setup() {

 /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line.
  /*important!*/ poster.setup(this, "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line.
 
  createCanvas(1050/2, 1920/2);
 background(100);

 for(let i = 0; i<gridCountX; i++) {
     for(let j = 0; j<gridCountY; j++) {

         gridArray[i][j] = 0; // creates an array with as many arrays as there are tiles (gridCountX * gridCountY)

         triangleList.push(new TesoTriangle(i,j)); } // nimmt soviel TesoTrianlges wie es tiles hat und gibt X und Y Coords.
}}


function draw() {
  
  counter++
  if (counter ==1)
  {
    for (let i = 0; i < triangleList.length; i++) {
      triangleList[i].randomizer();
    }
  }

noStroke(); 

 for(let i = 0; i<triangleList.length; i++) 
{
   triangleList[i].showTriangle();
}
for(let i =0; i < random10.length; i++){
  random10[i].displayTriangle();
}


 /*important!*/ poster.posterTasks(); // do not remove this last line! 

}


class TesoTriangle 
{

    constructor(i,j,w,h) 
    {

      this.i = i; //row and column
      this.j = j;

      this.w = width/gridCountX; // width and height -> dependant on canvas size
      this.h = height/gridCountY; 

      this.x = i * this.w; // top left corver coordinates of triangle
      this.y = j * this.h;  
    }


    getRandomElements(arr, num) 
  {
  var randomElements = [];
  let copyArr = [...arr]; // Create a copy of the array to avoid modifying the original array

  for (let i = 0; i < num; i++) {
      // Get a random index
      let randomIndex = Math.floor(Math.random() * copyArr.length);
      
      // Push the random element (subarray) into the result array
      randomElements.push(copyArr[randomIndex]);

      // Remove the selected element from the copyArr to avoid duplicates
      copyArr.splice(randomIndex, 1);
    }


  return randomElements;
  }

    randomizer()
    {
      push(); // for every triangle new settingBase

      translate(this.x,this.y)

      //calling the number arrays to color them
      let willTransitioning = numberThree.some(item => item[0] === this.i && item[1] === this.j);
      if ( willTransitioning) {
        isBlackTriangles.push([this.i,this.j])
      }
      let random10 = this.getRandomElements(isBlackTriangles, 10);
      pop()
    }


    showTriangle()
    {

      
      push(); // for every triangle new settingBase

      translate(this.x,this.y)


      //calling the number arrays to color them
      let isWhite = numberThree.some(item => item[0] === this.i && item[1] === this.j);
      if (isWhite) 
       {fill(0); } 

    
      // work out the orientation of the triangle based on column and row. 
      // checks if odd or even
      let invert = this.i%2
      invert -= this.j%2


      let slider = map(mouseX,0,width,-20,20)
      // draw
      if (invert) 
      {

        let p1 = createVector(0, this.h/2);
        let p2 = createVector(this.w, 0-(this.h/2))
        let p3 = createVector(this.w, this.h+(this.h/2))

        let m = (p2.y-p1.y)/(p2.x-p1.x)

        let parallelStart = createVector(p1.x+slider, p1.y+slider);

        let deltaX = this.w+100
        let deltaY = m * deltaX
        let parallelEnd = createVector(parallelStart.x + deltaX, parallelStart.y +deltaY)

        let rectWidth = (parallelEnd.x - parallelStart.x)/2;
        let rectHeight = (parallelEnd.y - parallelStart.y)/2;


        triangle(p1.x,p1.y,p2.x,p2.y,p3.x,p3.y)

      }

      else 
      {
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

    
    displayTriangle()
    {

      
      push(); // for every triangle new settingBase

      translate(this.x,this.y)
      

      let invert = this.i%2
      invert -= this.j%2


      let slider = map(mouseX,0,width,-20,20)
      // draw
      if (invert) 
      {

        let p1 = createVector(0, this.h/2);
        let p2 = createVector(this.w, 0-(this.h/2))
        let p3 = createVector(this.w, this.h+(this.h/2))

        let m = (p2.y-p1.y)/(p2.x-p1.x)

        let parallelStart = createVector(p1.x+slider, p1.y+slider);

        let deltaX = this.w+100
        let deltaY = m * deltaX
        let parallelEnd = createVector(parallelStart.x + deltaX, parallelStart.y +deltaY)

        let rectWidth = (parallelEnd.x - parallelStart.x)/2;
        let rectHeight = (parallelEnd.y - parallelStart.y)/2;


        triangle(p1.x,p1.y,p2.x,p2.y,p3.x,p3.y)


        canvas.getContext("2d").clip()



                for(let j=0; j<10; j++)
                {
                  push()
                  if(j%2==0 && j<5){fill(0) }else{fill(255)} 
        
                  // this.drawRectis(parallelStart.x - j * rectWidth, parallelStart.y + j * rectHeight, parallelEnd.x - j * rectWidth, parallelEnd.y + j * rectHeight);
                  this.drawRectis(parallelStart.x+j*offset, parallelStart.y+j*offset, parallelEnd.x+j*offset, parallelEnd.y+j*offset);
                  pop()
                }
            
          

      }

      else 
      {
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
      vertex (xe+40,ye+20);
      vertex(xx+40,yy+20)
      endShape(CLOSE)
      pop()
    }


}




