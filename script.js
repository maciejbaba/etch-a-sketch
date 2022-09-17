const container = document.getElementById("container")

function createGrid(rows, columns) {
  container.style.setProperty("--grid-rows", rows)
  container.style.setProperty("--grid-columns", columns)
  for (c = 0; c < rows * columns; c++) {
    let cell = document.createElement("div")
    container.appendChild(cell).className = "grid-item"
  }
}

createGrid(16, 16)