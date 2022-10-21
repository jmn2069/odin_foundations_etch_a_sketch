const container = document.getElementById('container');
const btnGrid = document.getElementById('changeGrid');
const btnClear = document.getElementById('clear');
const btnRandom = document.getElementById('random');
const btnErase = document.getElementById('erase');
const btnGradient = document.getElementById('gradient');
let randomColor = (0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
let btns = document.querySelectorAll('.btn');
let gradientColor = randomColor;
let colorCounter = 0;

let userColor = document.getElementById('manual');
let mode = 'random';
let gridSize = 16;
let mouseIsDown = false;

window.addEventListener('mousedown', function() { mouseIsDown = true; });
window.addEventListener('mouseup', function() { mouseIsDown = false; });
userColor.addEventListener('click', function() { setActiveMode('manual'); });
btnErase.addEventListener('click', function() { setActiveMode('erase'); });
btnGradient.addEventListener('click', function() { setActiveMode('gradient'); });
btnRandom.addEventListener('click', function() { setActiveMode('random'); });
btnGrid.addEventListener('click', function() { changeGrid(); });
btnClear.addEventListener('click', function() { clearGrid(); });
container.addEventListener('click', function() { clickColor(); });
container.addEventListener('mouseover', function() { mouseOverColor(); });

buildGrid();

setActiveMode(mode);

function setActiveMode(newMode) {
    mode = newMode;
    btns.forEach(btn => btn.classList.remove('active'));
    document.getElementById(newMode).classList.add('active');
}

function clickColor() {
    if (event.target === container) {
        return;
    }
    if (mode === 'manual'){
            event.target.style.removeProperty('opacity');
            event.target.style.backgroundColor = userColor.value;
    }   else if (mode === 'erase') {
            event.target.style.removeProperty('background-color');
            event.target.style.removeProperty('opacity');
    }   else if (mode === 'gradient') {
            event.target.style.backgroundColor = incrementColor(gradientColor, 65793);
    }   else if (mode === 'random' && !event.target.style.opacity || event.target.style.opacity < .1) {
            event.target.style.backgroundColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
            event.target.style.opacity = 1; 
    } else if (mode === 'random') {
        event.target.style.opacity -= .1;
}}

function mouseOverColor() {
        if (!mouseIsDown || event.target === container) {
        return;
    }
    if (mode === 'gradient') {
        if (!event.target.style.opacity || event.target.style.opacity < .1) {
            randomColor = incrementColor(randomColor, 65793);
            event.target.style.backgroundColor = randomColor;
            event.target.style.opacity = 1;
        } else {
            event.target.style.opacity -= .1;
        }
    } else if (mode === 'random') {
        if (!event.target.style.opacity || event.target.style.opacity < .1) {
            event.target.style.backgroundColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
            event.target.style.opacity = 1;
        } else if (event.target.style.backgroundColor) {
            event.target.style.opacity -= .1;
        }
    } else if (mode === 'manual') {
        event.target.style.removeProperty('opacity');
        event.target.style.backgroundColor = userColor.value;  
    } else if (mode === 'erase') {
        event.target.style.removeProperty('opacity');
        event.target.style.removeProperty('background-color');
    }
}

let incrementColor = function(color, step){
    let colorToInt = parseInt(color.substr(1), 16),                     
        nstep = parseInt(step);                                   
    if(!isNaN(colorToInt) && !isNaN(nstep)){                            
        colorToInt += nstep;                                            
        var ncolor = colorToInt.toString(16);                          
        ncolor = '#' + (new Array(7-ncolor.length).join(0)) + ncolor;   
        if(/^#[0-9a-f]{6}$/i.test(ncolor)){                            
            return ncolor;
        }
    }
    return color;
};

function clearGrid() {
    let gridSquares = document.querySelectorAll('.grid');
    gridSquares.forEach(grid => grid.style.removeProperty('background-color'));
    gridSquares.forEach(grid => grid.style.removeProperty('opacity'));
}

function changeGrid() {
    gridSize = prompt("Enter a number from 1-100")
    while (isNaN(gridSize) || gridSize < 0 || gridSize > 100 || gridSize === null){
        gridSize = prompt('Enter a number from 1-100');
    }
    removeAllChildNodes(container);
    buildGrid();
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function buildGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let newSquare = document.createElement('div');
            newSquare.classList.add('grid');
            container.appendChild(newSquare);
        }
    }
    const gridSquares = document.querySelectorAll('.grid');
    gridSquares.forEach(grid => grid.style.width = (960 / gridSize) + "px");
    gridSquares.forEach(grid => grid.style.height = (960 / gridSize) + "px");
}

window.addEventListener('dragstart', (e) => {
    e.preventDefault()
})
      
window.addEventListener('drop', (e) => {
    e.preventDefault()
    })