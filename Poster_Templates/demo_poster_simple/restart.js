let gridCountX = 16;
let gridCountY = 56;
let counter = 0; // to avoid unwanted looping

    //                    16x56 grid of null values
let gridArray = Array(gridCountX).fill().map(()=> Array(gridCountY).fill(null));
    // this creates an empty Array containing (here) 16 Arrays each of those containing 56 objects
    // basically if gridCountX = 3 and gridCountY = 4 it will be:
    // gridArray = [  [null, null, null, null],  [null, null, null, null], [null, null, null, null]   ]
    // basically CREATING THE COLUMN COORDINATES BUT! with null objects = undefined



let triangleList = [] // this stores ALL tiles resp. actual TesoTriangle objects
let matchingTiles = []; // this stores only the tiles that match the index of array numberThree

let transTiles =[]; //all the tiles that will transition
let staticTiles = []; // all other tiles that will have only solid black color


function setup() 
{

  /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line.
  /*important!*/ poster.setup(this, "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line.
 
    createCanvas(1050/2, 1920/2);
    background(255);


                        //16x56 grid of 0 values
    //This nested loop is going through every element in gridArray
    // Outer loop (i) iterates over each of the 16 rows (because gridCountX = 16)
    //Inner loop (j) iterates over each of the 56 columns in the current row (because gridCountY = 56)

    for (let rIndex = 0; rIndex < gridCountX; rIndex++) 
    {
      for (let cIndex = 0; cIndex < gridCountY; cIndex++) 
      {
        triangleList.push(new TesoTriangle(rIndex, cIndex));  // Use rIndex and cIndex
      }
    }

  /* MAY BE FAULTY
 for(let i = 0; i<gridCountX; i++) 
  {
     for(let j = 0; j<gridCountY; j++) 
        {
         gridArray[i][j] = 0; // creates an array with as many arrays as there are tiles (gridCountX * gridCountY)
              // Now there are 16 arrays with each having 56 elements and each element being 0 
              // basically [ [0,0,0,0,0,0,...], [0,0,0,0,0,0,0,...]  , ...]


         triangleList.push(new TesoTriangle(i,j)); 
              // triangleList erhält nun Objekte mit rIndex, cIndex, w, h, x, y
              // rIndex und cIndex werden durch loop gegeben, als [0,0],[0,1],[0,2],... bis [15,55]         
              
              // triangleList hat jetzt ALLE tilesObjekte
        }
  }
  */
}






//WE WILL EXTRACT THE TILES THAT CREATE THE FONT NUMBERS
function Extraction() 
{
//console.log("numberThree:", numberThree); checked: yes numberThree is full

    // Iterate through triangleList and check if coordinates match any in numberThree
    for (let i = 0; i < triangleList.length; i++) 
    {
      let triangle = triangleList[i]; 
            //this is referencing every single TesoObject (with all its properties)
  
      let isMatch = numberThree.some(item => item[0] === triangle.rIndex && item[1] === triangle.cIndex);
            // numberThree has pair Arrays, where they have position 0 and 1 , [3,4] with 3 is position [0] which is theoretically rIndex
            // triangle.i is property of one TesoTriangle, its rIndex property
            // it checks if a a triangle has the same rIndex as the rIndex of a numberThree array


      if (isMatch)   // a boolean "if this condition is true then..." 
      {
        matchingTiles.push(triangle);
        // ...the triangle (= the Teso Object with ALL its properties) is being pushed into array matchingTiles 
      }
    }
// console.log("matchingTiles:", matchingTiles); checked; yes the matchingTiles are populated

    return matchingTiles;  // Returns the list of matching triangles
}



// COMBI-FUNCTION
// WE SHUFFLE THE ARRAY (function will be called in shuffleAndSplitTiles)
function shuffleArray(array) 
{
  for (let i = array.length - 1; i > 0; i--) 
  {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}
//  WE ASSIGN (NON-)TRANSITIONING TILES TO DIFFERENT ARRAYS
function shuffleAndSplitTiles() 
{ 
//console.log("shuffleAndSplitTiles is being called"); checked correct
//console.log("matchingTiles before shuffle:", matchingTiles); checked correct
//console.log(numberThree) checked correct
//console.log("done") checked correct

  shuffleArray(matchingTiles);  // we call the shuffle function
  
  // Split the shuffled array into transTiles and staticTiles
  transTiles = matchingTiles.slice(0, 10);  // First 10 elements
  staticTiles = matchingTiles.slice(10);    // The rest of the elements

// console.log("transTiles:", transTiles);  checked, working
//console.log("staticTiles:", staticTiles); checked, working
}



function draw()
{
  
  /*important!*/ poster.posterTasks(); // do not remove this last line! 
  
 
  if (counter == 0)
  {
    Extraction();
    shuffleAndSplitTiles();
    counter++
  }
  console.log("Current counter value:", counter);


  // STATIC TRIANGLES DRAWN
  for (let i = 0; i < staticTiles.length; i++) 
  {
    staticTiles[i].displayStatic();  // Call displayStatic() for each TesoTriangle object
    console.log("happeningA")
  }

  // DYNAMIC TRIANGLES DRAWN
  for (let i = 0; i< transTiles.length; i++)
  {
    transTiles[i].displayTransition();
    console.log("happeningB")
  }
}






class TesoTriangle
{
  constructor(rIndex,cIndex,w,h)  
    {
      this.rIndex = rIndex; //if you have a 16x56 grid, i will vary from 0 to 15 (for a 16-row grid).
      this.cIndex = cIndex; // For a 16x56 grid, j will vary from 0 to 55 (for a 56-column grid).

      this.w = width/gridCountX; // width and height of each grid cell-> dependant on canvas size
      this.h = height/gridCountY; 

      this.x = rIndex * this.w; // the actual x/y position since it's not going to be on x=1, x=2 (if i++)
      this.y = cIndex * this.h; 


    }




    displayStatic()
    {
      push(); // for every triangle new settingBase
      translate(this.x,this.y)
      fill(0)

      let invert = this.rIndex%2 // calculates Orientation
      invert -= this.cIndex%2

      console.log("invert_"+invert)

      //let slider = map(mouseX,0,width,-20,20) //to create INTERACTION
      // THIS IS THE CODE TO DRAW THE ACTUAL STATIC TRIANGLE!!!
      // IF POINTING LEFT

      if (invert) 
      {
        let p1 = createVector(0, this.h/2);
        let p2 = createVector(this.w, 0-(this.h/2))
        let p3 = createVector(this.w, this.h+(this.h/2))


        let m = (p2.y-p1.y)/(p2.x-p1.x)

        let parallelStart = createVector(p1.x, p1.y); //here add slider

        let deltaX = this.w+100
        let deltaY = m * deltaX
        let parallelEnd = createVector(parallelStart.x + deltaX, parallelStart.y +deltaY)

        triangle(p1.x,p1.y,p2.x,p2.y,p3.x,p3.y)

      }
      // IF POINTING RIGHT
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






    displayTransition()
    {
      push(); // for every triangle new settingBase
      translate(this.x,this.y)
      fill(0)

      let invert = this.rIndex%2 // calculates Orientation
      invert -= this.cIndex%2

      //let slider = map(mouseX,0,width,-20,20) //to create INTERACTION

// THIS IS THE CODE TO DRAW THE ACTUAL DYNAMIC TRIANGLE!!!
      // IF POINTING LEFT
      if (invert) 
      {

        let p1 = createVector(0, this.h/2);
        let p2 = createVector(this.w, 0-(this.h/2))
        let p3 = createVector(this.w, this.h+(this.h/2))

        let m = (p2.y-p1.y)/(p2.x-p1.x)

        let parallelStart = createVector(p1.x, p1.y); //here add slider

        let deltaX = this.w+100
        let deltaY = m * deltaX
        let parallelEnd = createVector(parallelStart.x + deltaX, parallelStart.y +deltaY)

        triangle(p1.x,p1.y,p2.x,p2.y,p3.x,p3.y)

      }
      // IF POINTING RIGHT
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

