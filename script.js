const container = document.getElementById("grid")
createGrid(16, 16)

const gridSquares = [...document.getElementsByClassName("grid-item")]

const pickColorButton = document.getElementById("pick-color")
const colorModeButton = document.getElementById("color-mode-button")
const rainbowModeButton = document.getElementById("rainbow-mode-button")
const eraserModeButton = document.getElementById("eraser-mode-button")
const clearButton = document.getElementById("clear-button")
const selectSizeValue = document.getElementById("select-size")
const DEFAULT_BUTTON_COLOR = "white"

let drawColor = pickColorButton.value
let drawMode = "color"
setModeButtonActive(drawMode)

let mouseDown = false

document.body.onmousedown = function() {
  mouseDown = true
}

document.body.onmouseup = function() {
  mouseDown = false
}

colorModeButton.addEventListener("click", function() {
  drawMode = "color"
  setModeButtonActive(drawMode)
})

rainbowModeButton.addEventListener("click", function() {
  drawMode = "rainbow"
  setModeButtonActive(drawMode)
})

eraserModeButton.addEventListener("click", function() {
  drawMode = "eraser"
  setModeButtonActive(drawMode)
})

clearButton.addEventListener("click", function() {
  gridSquares.forEach(function(square) {
    square.style.backgroundColor = "white"
  })
})

function setDrawColor(mode) {
  if(mode === "color") return pickColorButton.value

  if (mode === "rainbow") return pickRandomHexColor()

  if (mode == "eraser") return "white"
}

function deactiveModeButtons() {
  colorModeButton.style.backgroundColor = DEFAULT_BUTTON_COLOR
  rainbowModeButton.style.backgroundColor = DEFAULT_BUTTON_COLOR
  eraserModeButton.style.backgroundColor = DEFAULT_BUTTON_COLOR
}

function setModeButtonActive(mode) {

  deactiveModeButtons()

  if (mode === "color") colorModeButton.style.backgroundColor = "aqua"
  if (mode === "rainbow") rainbowModeButton.style.backgroundColor = "aqua"
  if (mode === "eraser") eraserModeButton.style.backgroundColor = "aqua"
}

function pickRandomHexColor() {
  const redHex = Math.floor(Math.random() * 256).toString(16)
  const greenHex = Math.floor(Math.random() * 256).toString(16)
  const blueHex= Math.floor(Math.random() * 256).toString(16)

  return "#" + redHex + greenHex + blueHex
}

function createGrid(rows, columns) {
  container.style.setProperty("--grid-rows", rows)
  container.style.setProperty("--grid-columns", columns)

  for (c = 0; c < rows * columns; c++) {
    let cell = document.createElement("div")
    cell.ondragstart = function() {
      return false
    }

    cell.addEventListener("mouseover", function() {
      if (mouseDown) cell.style.backgroundColor = setDrawColor(drawMode)
    })

    container.appendChild(cell).className = "grid-item"
  }
}
