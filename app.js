// Parameters for setting up the game.
const nBoardRows = 3
const nBoardCols = 12
const nPieces  = 4
const slotSizePx = 75
const playButtonSizePx = 75

const debugMode = true

// Start a game object from an audio file.
nBoardSlots = nBoardRows * nBoardCols
const game = new Game(nPieces, nBoardSlots, false, debugMode)

// Set up game container.
const gameDiv = document.querySelector('.game')
const boardWidth = slotSizePx * nBoardCols
gameDiv.style.width = ((slotSizePx) * nBoardCols + 2) +'px'

// Create board divs.
const boardDiv = document.querySelector('.board')
boardDiv.style.width = boardWidth
boardDiv.style.height = (slotSizePx * nBoardRows + 2) + 'px'
for (let i = 0; i < nBoardSlots; i++) {
    boardDiv.appendChild(getSlotElement('board', i))
}

// Create audio player divs.
const audioPlayerDiv = document.querySelector('.audio-player')
audioPlayerDiv.style.width = (slotSizePx * nPieces + playButtonSizePx) + 'px'
audioPlayerDiv.style.height = slotSizePx + 'px'
for (let i = 0; i < nPieces; i++) {
    audioPlayerDiv.appendChild(getSlotElement('audio-player', i))
}

// Audio player "play" button.
const playDiv = document.createElement('div')
playDiv.classList.add('audio-player-play')
playDiv.style.width = playButtonSizePx + 'px'
playDiv.style.height = playButtonSizePx + 'px'
playDiv.onclick = () => {
    if (debugMode) {
        console.log('Play button clicked')
    }
    game.playClick()
}
audioPlayerDiv.appendChild(playDiv)

// Button to start the game.
const startButton = document.querySelector('.start-button')
startButton.onclick = () => {
    startGame()
}

// Image for dragging operations.
const dragImage = new Image();
dragImage.src = 'images/piece_dragging.png';
dragImage.style.width = slotSizePx + 'px'
dragImage.style.height = slotSizePx + 'px'
const dragDiv = document.createElement('div')
dragDiv.appendChild(dragImage)
// The dragging element has to be in the document body, but we don't want it to show permanently, so positioning it off the page.
dragDiv.style.position = 'absolute'
dragDiv.style.top = (-slotSizePx * 2) + 'px'
dragDiv.style.left = (-slotSizePx * 2) + 'px'
document.body.appendChild(dragDiv)

// Generate a div element for board or audio player.
function getSlotElement(component, id) {
    const element = document.createElement('div')
    element.classList.add(component + '-slot')
    element.id = id
    element.style.width = (slotSizePx) + 'px'
    element.style.height = (slotSizePx) + 'px'
    element.draggable = false
    
    element.onclick = () => {
        if (debugMode) {
            console.log('Play: ' + component + ', ' + element.id)
        }
        game.slotClick(component, element.id)
    }

    // Set up drag and drop listeners for moving pieces.
    element.ondragstart = (event) => {
        if (debugMode) {
            console.log('Drag start: ' + component + ', ' + element.id)
        }
        event.stopPropagation()
        event.dataTransfer.setDragImage(dragDiv, slotSizePx / 2, slotSizePx / 2)
        game.slotDrag(component, element)
    }
    element.ondragend = () => {
        if (debugMode) {
            console.log('Drag end: ' + component + ', ' + element.id)
        }
        game.slotDragEnd()
    }
    element.ondrop = () => {
        if (debugMode) {
            console.log('Drop: ' + component + ', ' + element.id)
        }
        game.slotDrop(component, element)
    }

    return element
}

function startGame() {
    game.start('bart.wav')
}
