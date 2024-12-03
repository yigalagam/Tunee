// Parameters for setting up the game.
const nBoardRows = 3
const nBoardCols = 12
const nPieces  = 10
const slotSizePx = 30

// Start a game object from an audio file.
nBoardSlots = nBoardRows * nBoardCols
const game = new Game('small.wav', nPieces, nBoardSlots, true)

// Set up game container.
const gameDiv = document.querySelector('.game')
gameDiv.style.width = slotSizePx * nBoardCols + 'px'
gameDiv.style.height = slotSizePx * (nBoardRows + 1) + 'px'
gameDiv.onClick = () => {
    alert('Game click')
}

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

// Generate a div element for board or audio player.
function getSlotElement(component, id) {
    const element = document.createElement('div')
    element.classList.add(component + '-slot')
    element.id = id
    element.style.width = slotSizePx + 'px'
    element.style.height = slotSizePx + 'px'
    element.onclick = () => {
        game.slotClick(component, element.id)
    }

    // Set up drag and drop listeners for moving pieces.
    element.ondragstart = (event) => {
        game.slotDrag(component, element.id)
        event.stopPropagation()
    }
    element.ondragover = (event) => {
        // This listener is needed to allow dropping in a slot.
        event.preventDefault()
    }
    element.ondrop = () => {
        game.slotDrop(component, element.id)
        element.isDragging = false
    }

    return element
}

game.start()