const container = document.getElementById('container');
const btnGrid = document.getElementById('changeGrid');
const btnClear = document.getElementById('clear');
let userColor = document.getElementById('userColor');
let manualColor = false;

userColor.addEventListener('click', function() { setUserColor(); });

function setUserColor() {
    manualColor = true;
    gridSquares.forEach(grid => grid.style.opacity = '1');
}

// const gridSquares = document.querySelectorAll('.grid');
let gridSize = 16;

btnGrid.addEventListener('click', function() { changeGrid(); });
btnClear.addEventListener('click', function() { clear(); });

function clear() {
    const gridSquares = document.querySelectorAll('.grid');
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
    gridSquares.forEach(grid => grid.addEventListener("mouseover", colorPicker));
    gridSquares.forEach(grid => grid.style.width = (960 / gridSize) + "px");
    gridSquares.forEach(grid => grid.style.height = (960 / gridSize) + "px");
}
var mouseIsDown = false;

window.addEventListener('mousedown', function() { mouseIsDown = true; });

window.addEventListener('mouseup', function() { mouseIsDown = false; });

function colorPicker() {
    if (mouseIsDown && manualColor) {
        this.style.backgroundColor = userColor.value;
        this.style.opacity = 1;
        return;
    }
        if (mouseIsDown && (!this.style.backgroundColor || this.style.opacity < .1)){
            let randomColor = Math.floor(Math.random()*16777215).toString(16);
            this.style.backgroundColor = '#' + randomColor;
            this.style.opacity = 1;
        } else if (mouseIsDown) {
            this.style.opacity -= .1;
        }
    }

    window.addEventListener('dragstart', (e) => {
        e.preventDefault()
      })
      
      window.addEventListener('drop', (e) => {
        e.preventDefault()
      })

buildGrid();