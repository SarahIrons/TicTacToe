//Keep track of whose turn it is:
let activePlayer = 'X';
//this array stores an array of moves; it is used to determine conditions needed for a win.
let selectedSquares = [];

//this is for placing x or o in a square.
function placeXOrO(squareNumber) {
    //this condition ensures a square hasn't been selected already. 
    //the .some() method is used to check ea element of the selectSquare array to see if it /contains the square number clicked on.
    //
    if (!selectedSquares.some(element=> element.includes(squareNumber))){
        //this variable retrieves the HTML element ID that was clicked.
        let select = document.getElementById(squareNumber);
        //this condition checks whose turn it is.
        if (activePlayer === 'X') {
            //if aP is X then the x png is placed in HTML. (x marks the square)
            select.style.backgroundImage = 'url("Images/donutX.png")';
            //aP may only be 'X' or 'O'--so if it's not X it has to be 'O'.
        } else {
            //if aP is equal to 'O' the o.png is placed in HTML (o marks the square)
            select.style.backgroundImage = 'url("Images/donutO.png")';
    }
    //squareNumber and aP are concatenated together and added to an array.
    selectedSquares.push(squareNumber + activePlayer);
    //this calls a function to check for any win conditions.
    checkWinConditions();
    //this cond is for changing the active player.
    if(activePlayer==='X') {
        //if aP is x then change it to o.
        activePlayer= "O";
        //if aP is anything other than 'x'
} else {
    //change aP to 'X'
    activePlayer ='X';
}
//this function plays a placement sound.
audio('Media/fingersnap.mp3');
//this cond checks to see if it is the computer's turn.
if(activePlayer ==='O') {
    //this function disables clicking for computer's turn.
    disableClick();
    //this function waits 1 second before the computer places an image and enables click.
    setTimeout(function() {computersTurn(); }, 1000);
}
//returning true is needed for our computersTurn()function to work.
return true;
}
//this function results in a random square being selected by the computer.
function computersTurn() {
    console.log("comp turn")
    //this boolean is needed for our while loop.
    let success = false;
    //this variable stores a random number 0-8.
    let pickASquare;
    //this condition allows our while loop to keep trying if a square is selected already.
    while(!success) {
        //a random number between 0-8 is selected.
        pickASquare = String(Math.floor(Math.random() * 9 ));
        //if the random number evaluated returns true, the square hasn't been selected yet.
        if(placeXOrO(pickASquare)){
            //this line calls the function.
            placeXOrO(pickASquare);
            //this changes our boolean and ends the loop.
            success = true; 
        };
    }
}
}
//
//this function parses the selectedSquares array to search for win conditions. 
//drawLine() function is called to draw a line on the screen if the cond is met.
function checkWinConditions() {
    //X  0,1,2 cond.
    if (arrayIncludes('0X', '1X', '2X')) {drawWinLine(50,100,558,100) }
    //X 3,4,5 cond.
    else if (arrayIncludes('3X','4X', '5X')) {drawWinLine(50,304,558,304) }
    //X 6,7,8 cond.
    else if (arrayIncludes('6X', '7X','8X')) {drawWinLine(50,508,558,508)}
    //X 0,3,6 cond.
    else if (arrayIncludes('0X','3X','6X')) {drawWinLine(100,50,100,558)}
    //X 1,4,7 cond.
    else if (arrayIncludes('1X','4X','7X')) {drawWinLine(304,50,304,558)}
    //X 2,5,8 cond.
    else if (arrayIncludes('2X','5X','8X')) {drawWinLine(508,50,508,558)}
    //X 6,4,2 cond.
    else if (arrayIncludes('6X','4X','2X')) {drawWinLine(100,508,510,90)}
    // X 0,4,8 cond.
    else if (arrayIncludes('0X','4X','8X')) {drawWinLine(100,100,520,520)}
    //O 0,1,2 cond.
    if (arrayIncludes('0O', '1O', '2O')) {drawWinLine(50,100,558,100) }
    //O 3,4,5 cond.
    else if (arrayIncludes('3O','4O', '5O')) {drawWinLine(50,304,558,304) }
    //O 6,7,8 cond.
    else if (arrayIncludes('6O', '7O','8O')) {drawWinLine(50,508,558,508)}
    //O 0,3,6 cond.
    else if (arrayIncludes('0O','3O','6O')) {drawWinLine(100,50,100,558)}
    //O 1,4,7 cond.
    else if (arrayIncludes('1O','4O','7O')) {drawWinLine(304,50,304,558)}
    //O 2,5,8 cond.
    else if (arrayIncludes('2O','5O','8O')) {drawWinLine(508,50,508,558)}
    //O 6,4,2 cond.
    else if (arrayIncludes('6O','4O','2O')) {drawWinLine(100,508,510,90)}
    // O 0,4,8 cond.
    else if (arrayIncludes('0O','4O','8O')) {drawWinLine(100,100,520,520)}
    //this cond checks for a tie. if none of above conditions are met and 
    //9 squares are selected, the code executes..
    else if (selectedSquares.length >= 9) {
        //this function plays tie game sound.
        audio('Media/tiesound.mp3');
        //this function sets a .3 sec timeer before the resetGame is called.
        setTimeout(function() { resetGame(); }, 500);
    }
    //this function chekcs if an array includes 3 strings. it is used to check for 
    //each win condition.
    function arrayIncludes(squareA, squareB, squareC) {
        //these 3 variables will be used to check for three in a row.
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        //if the 3 variables we pass are all included in our array, then 
        //true is returned and our else if condition executes the drawLine function.
        if (a===true & b===true && c===true) {return true; }
    }
}
//
//this function makes our body element temporarily unclickable.
function disableClick() {
    //this makes body unclickable
    body.style.pointerEvents = 'none';
    //this maks body clickable agin after one second.
    setTimeout(function () { body.style.pointerEvents = 'auto'; }, 1000);  
}
//
//this function takes a string parameter of the path you set earlier for 
//placemen t sound 
function audio(audioURL) {
    //we create a new audio object and we pass the path as a parameter.
    let audio = new Audio(audioURL);
    //play method plays our audio sound.
    audio.play(); 
    }
//
//this function utilizes HTML canvas to draw win lines.
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    //this line accesses our HTML canvas element
    const canvas = document.getElementById('win-lines');
    //this line gives us access to methods and properties to use on canvas.
    const c = canvas.getContext('2d');
    //this line indicates where the start of the star of a line's x axis is
    let x1 = coordX1,
    //start of a line's y axis
    y1 = coordY1,
    //end of x axis
    x2 = coordX2,
    //end of y axis
    y2 = coordY2,
    //this variable stores temporary x axis data we update in our animation loop.
    x = x1,
    //this stores temp y axis data
    y = y1;
    //this function interacts with the canvas. 
    function animateLineDrawing() {
        //this variable creates a loop.
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        //this method clears content fromthe lasdt loop iteration. 
        c.clearRect(0,0,608,608);
        //this method starts a new path.
        c.beginPath();
        //this method moves us to a starting point in our line.
        c.moveTo(x1,y1);
        //this method indicates end point in the line
        c.lineTo(x,y);
        //this sets width of line.
        c.lineWidth = 10; 
        //sets color of line
        c.strokeStyle = 'cyan';
        //this method draws out everything described above.
        c.stroke();
        //this condition checks if wse've reached endpoints
        if(x1 <= x2 && y1 <=y2) {
            //this condition adds 10 to the prev end x endpoint.
            if (x < x2) {x+=10; }
            //this adds adds 10 to y endpoint
            if (y < y2) {y+=10; }
            //
            //this is necessary for the 6,4,2 win conditions.
            if(x >= x2 && y>= y2) {cancelAnimationFrame(animationLoop);}
        }
        //this cond is similar to one above.
        //this is necessary for 6,4,2 win conditions
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) {x += 10; }
            if (y > y2) {y -+10; }
            if (x >= x2 && y <= y2) {cancelAnimationFrame(animationLoop); }
    }
}
//this function clears our canvas after our win line is drawn.
function clear() {
    //this line starts our animation loop.
    const animationLoop = requestAnimationFrame(clear);
    //this line clears our canvas.
    c.clearRect(0,0,608,608);
    //this line stops our animation loop.
    cancelAnimationFrame(animationLoop);
} 
//this line disallows clicking while the win sound is playing.
disableClick(); 
//this line plays the win sounds.
audio('Media/sparkle.mp3'); 
//this line calls our main animation loop.
animateLineDrawing();
//this line waits one second. then clears canvas, resets game and allows clicking again.
setTimeout(function() {clear(); resetGame(); }, 1000);
}
//
//this function resets the game in event of win or tie.
function resetGame() {
    //this for loop iterates through each HTML square element.
    for (let i = 0; i < 9; i ++) {
        //this variable gets the HTML element i.
        let square = document.getElementById(String(i));
        //this removes our element's backgroundImage.
        square.style.backgroundImage = ''; 
    }
    //this resets our array so it is empty and we can start over. 
    selectedSquares = []; 
}