// Parameters for setting up the game.
const nBoardRows = 5
const nBoardCols = 12
const nPieces  = 10
const baseSize = 25
const slotSizePx = 3 * baseSize
const playButtonSizePx = 3 * baseSize

const debugMode = true

// Start a game object from an audio file.
nBoardSlots = nBoardRows * nBoardCols
const game = new Game(nPieces, [nBoardRows, nBoardCols], false, debugMode)

// Set up game container.
const gameDiv = document.querySelector('.game')
const boardWidth = slotSizePx * nBoardCols
gameDiv.style.width = ((slotSizePx) * nBoardCols + 2) +'px'

// Create board divs.
const boardDiv = document.querySelector('.board')
boardDiv.style.width = boardWidth
boardDiv.style.height = (slotSizePx * nBoardRows + 2) + 'px'
for (let i = 0; i < nBoardSlots; i++) {
    boardDiv.appendChild(getBoardSlotDiv(i))
}

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

// Button to start the game.
const startButton = document.querySelector('.start-button')
startButton.style.marginTop = baseSize + 'px'
startButton.style.width = (baseSize * 3) + 'px'
startButton.style.height = (baseSize * 3) + 'px'
startButton.onclick = () => {
    startGame()
}

function startGame() {
    game.start('tame_impala.wav')
}