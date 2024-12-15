// Parameters for setting up the game.
const nBoardRows = 5
const nBoardCols = 12
const nPieces  = 3
const baseSize = 25
const slotSizePx = 3 * baseSize
const font = 'Helvetica'
const fontSize = 1.35

const debugMode = true

// Start a game object from an audio file.
nBoardSlots = nBoardRows * nBoardCols
const game = new Game(nPieces, [nBoardRows, nBoardCols], false, debugMode)

// Set up game container.
const gameDiv = document.createElement('div')
const boardWidth = slotSizePx * nBoardCols
gameDiv.style.width = ((slotSizePx) * nBoardCols + 2) +'px'
gameDiv.style.margin = '0 auto'
gameDiv.style.display = 'grid'
gameDiv.style.justifyItems = 'center'
gameDiv.style.alignItems = 'center'
document.body.appendChild(gameDiv)

// Create board divs.
const boardDiv = document.createElement('div')
boardDiv.style.backgroundImage = "url('../images/gray.png')"
boardDiv.style.backgroundSize = 'cover'
boardDiv.style.border = '1px solid'
boardDiv.style.width = boardWidth
boardDiv.style.height = (slotSizePx * nBoardRows + 2) + 'px'
boardDiv.style.display = 'flex'
boardDiv.style.flexWrap = 'wrap'
for (let i = 0; i < nBoardSlots; i++) {
    boardDiv.appendChild(getBoardSlotDiv(i))
}
gameDiv.appendChild(boardDiv)

// Image for dragging operations.
const dragImage = new Image();
dragImage.src = 'images/piece_dragged.png';
dragImage.style.width = slotSizePx + 'px'
dragImage.style.height = slotSizePx + 'px'
const dragDiv = document.createElement('div')
dragDiv.appendChild(dragImage)
// The dragging element has to be in the document body, but we don't want it to show permanently, so positioning it off the page.
dragDiv.style.position = 'absolute'
dragDiv.style.top = (-slotSizePx * 2) + 'px'
dragDiv.style.left = (-slotSizePx * 2) + 'px'
document.body.appendChild(dragDiv)

// Generate a div element for board slots.
function getBoardSlotDiv(id) {
    const div = document.createElement('div')
    div.classList.add('board-slot')
    div.id = id
    div.style.width = (slotSizePx) + 'px'
    div.style.height = (slotSizePx) + 'px'
    div.style.border = 'dotted 0.25px'
    div.style.boxSizing = 'border-box'
    div.draggable = false
    
    div.onclick = () => {
        if (debugMode) {
            console.log('Play: slot ' + div.id)
        }
        game.slotClick(Number(div.id))
    }

    // Set up drag and drop listeners for moving pieces.
    div.ondragstart = (event) => {
        if (debugMode) {
            console.log('Drag start: slot ' + div.id)
        }
        event.stopPropagation()
        event.dataTransfer.setDragImage(dragDiv, slotSizePx / 2, slotSizePx / 2)
        event.dataTransfer.effectAllowed = 'move'
        game.slotDrag(div)
    }
    div.ondragend = (event) => {
        if (debugMode) {
            console.log('Drag end: slot ' + div.id)
        }
        event.preventDefault()
        game.slotDragEnd()
    }
    
    div.ondrop = () => {
        if (debugMode) {
            console.log('Drop: slot ' + div.id)
        }
        game.slotDrop(div)
    }

    return div
}

// Button to start the game and share after you win.
const actionButton = document.createElement('div')
actionButton.classList.add('action-button')
actionButton.style.backgroundImage = "url('../images/yellow.png')"
actionButton.style.backgroundSize = 'cover'
actionButton.style.border = '3px solid'
actionButton.style.width = (baseSize * 3) + 'px'
actionButton.style.height = (baseSize * 3) + 'px'
actionButton.style.marginTop = baseSize + 'px'
actionButton.innerHTML = 'Start'
actionButton.style.fontFamily = font
actionButton.style.fontSize = fontSize + 'em'
actionButton.style.fontWeight = 'bold'
actionButton.style.display = 'flex'
actionButton.style.alignItems = 'center'
actionButton.style.justifyContent = 'center'
actionButton.style.userSelect = 'none'
actionButton.onclick = () => {
    startGame()
}

// Set up timer display.
const timer = document.createElement('div')
timer.classList.add('timer')
timer.style.backgroundImage = "url('../images/yellow.png')"
timer.style.backgroundSize = 'cover'
timer.style.border = '3px solid'
timer.style.width = (baseSize * 6) + 'px'
timer.style.height = (baseSize * 3) + 'px'
timer.style.marginTop = baseSize + 'px'
timer.innerHTML = '00:00:00'
timer.style.fontFamily = font
timer.style.fontSize = fontSize + 'em'
timer.style.fontWeight = 'bold'
timer.style.display = 'flex'
timer.style.alignItems = 'center'
timer.style.justifyContent = 'center'
timer.style.userSelect = 'none'

// Area containing the game controls (anything outside the board).
const controlDiv = document.createElement('div')
controlDiv.style.width = (baseSize * 20) + 'px'
controlDiv.style.height = (baseSize * 5) + 'px'
controlDiv.style.backgroundImage = "url('../images/gray.png')"
controlDiv.style.border = '1px solid'
controlDiv.style.marginTop = baseSize + 'px'
controlDiv.style.marginLeft = 'auto'
controlDiv.style.marginRight = 'auto'
controlDiv.style.display = 'flex'
controlDiv.style.justifyContent = 'space-around'
controlDiv.appendChild(actionButton)
controlDiv.appendChild(timer)
document.body.appendChild(controlDiv)

function startGame() {
    game.start('coltrane.wav')
}