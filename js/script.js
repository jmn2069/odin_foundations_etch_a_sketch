const container = document.getElementById('container');
const btn = document.getElementById('changeGrid');
let gridSize = 16;

btn.addEventListener('click', function() { changeGrid(); });

function changeGrid() {
    gridSize = prompt("Enter the number from 1-100")
    while (isNaN(gridSize) || gridSize < 0 || gridSize > 100){
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

function colorPicker() {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    this.style.backgroundColor = '#' + randomColor;
}

buildGrid();

