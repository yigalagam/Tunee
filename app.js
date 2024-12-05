// Parameters for setting up the game.
const nBoardRows = 3
const nBoardCols = 12
const nPieces  = 4
const slotSizePx = 50

const debugMode = true

// Start a game object from an audio file.
nBoardSlots = nBoardRows * nBoardCols
const game = new Game(nPieces, nBoardSlots, false, debugMode)

// Set up game container.
const gameDiv = document.querySelector('.game')
gameDiv.style.width = slotSizePx * nBoardCols + 'px'
gameDiv.style.height = slotSizePx * (nBoardRows + 1) + 'px'

// Create board divs.
const boardDiv = document.querySelector('.board')
boardDiv.style.width = slotSizePx * nBoardCols + 'px'
boardDiv.style.height = (slotSizePx * nBoardRows) + 'px'
for (let i = 0; i < nBoardSlots; i++) {
    boardDiv.appendChild(getSlotElement('board', i))
}

// Create audio player divs.
const audioPlayerDiv = document.querySelector('.audio-player')
audioPlayerDiv.style.width = slotSizePx * nBoardCols + 'px'
audioPlayerDiv.style.height = slotSizePx + 'px'
for (let i = 0; i < nPieces; i++) {
    audioPlayerDiv.appendChild(getSlotElement('audio-player', i))
}

// Audio player "play" button.
const playDiv = document.createElement('div')
playDiv.classList.add('audio-player-play')
playDiv.style.width = slotSizePx + 'px'
playDiv.style.height = slotSizePx + 'px'
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

// Generate a div element for board or audio player.
function getSlotElement(component, id) {
    const element = document.createElement('div')
    element.classList.add(component + '-slot')
    element.id = id
    element.style.width = slotSizePx + 'px'
    element.style.height = slotSizePx + 'px'
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
