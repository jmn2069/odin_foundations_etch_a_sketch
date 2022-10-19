const container = document.getElementById('container');
const btnGrid = document.getElementById('changeGrid');
const btnClear = document.getElementById('clear');
const btnRandom = document.getElementById('random');
const btnErase = document.getElementById('erase');

let userColor = document.getElementById('userColor');
let mode = 'random';
let gridSize = 16;
let mouseIsDown = false;

window.addEventListener('mousedown', function() { mouseIsDown = true; });
window.addEventListener('mouseup', function() { mouseIsDown = false; });
userColor.addEventListener('click', function() { mode = 'manual'; });
btnErase.addEventListener('click', function() { mode = 'erase'; });
btnGrid.addEventListener('click', function() { changeGrid(); });
btnClear.addEventListener('click', function() { clearGrid(); });
btnRandom.addEventListener('click', function() { mode = 'random' });

function setUserColor() {
    let gridSquares = document.querySelectorAll('.grid');
    gridSquares.forEach(grid => grid.style.opacity = '1');
}

function clearGrid() {
    let gridSquares = document.querySelectorAll('.grid');
    gridSquares.forEach(grid => grid.style.removeProperty('background-color'));
    manualColor = false;
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
        let newRow = document.createElement('div');
        newRow.classList.add('row');
        container.appendChild(newRow);
        for (let j = 0; j < gridSize; j++) {
            let newSquare = document.createElement('div');
            newSquare.classList.add('grid');
            newRow.appendChild(newSquare);
        }
    }
    const gridSquares = document.querySelectorAll('.grid');
    gridSquares.forEach(grid => grid.addEventListener("mouseover", applicator));
    gridSquares.forEach(grid => grid.addEventListener("click", manualApplicator));
    gridSquares.forEach(grid => grid.style.width = (960 / gridSize) + "px");
    gridSquares.forEach(grid => grid.style.height = (960 / gridSize) + "px");
}

function manualApplicator() {
    console.log('manualApp')
    if (mode === 'manual'){
        this.style.opacity = 1;
        this.style.backgroundColor = userColor.value;
    }   else if (mode === 'erase') {
        this.style.opacity = 1;
        this.style.removeProperty('background-color');
    } else if (mode === 'random') {
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        this.style.backgroundColor = '#' + randomColor;
        this.style.opacity = 1; 
    }
}

function applicator() {
    if (mouseIsDown && mode === 'manual') {
        this.style.backgroundColor = userColor.value;
        this.style.opacity = 1;
    } else if (mouseIsDown && mode==='random' && (!this.style.backgroundColor || this.style.opacity < .1)) {
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        this.style.backgroundColor = '#' + randomColor;
        this.style.opacity = 1;   
    } else if (mouseIsDown && mode === 'erase') {
        this.style.opacity = 1;
        this.style.removeProperty('background-color');
    } else if (mouseIsDown) {
        this.style.opacity -= .1;
}}

    window.addEventListener('dragstart', (e) => {
        e.preventDefault()
      })
      
      window.addEventListener('drop', (e) => {
        e.preventDefault()
      })

buildGrid();