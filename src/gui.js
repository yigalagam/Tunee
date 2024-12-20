// Parameters for setting up the game GUI.
const baseSize = 25
const slotSizePx = 3 * baseSize
const font = 'Verdana'
const fontSize = 1.3
const lightGray = '#AFAFAF'
const darkGray = '#5F5F5F'
const yellow = '#FFC000'
const borderWidth = 3
const borderRadius = '10px'

class gui {

    constructor(nBoardRows, nBoardCols) {
        this.nBoardRows = nBoardRows
        this.nBoardCols = nBoardCols
        
        this.gameDiv = null
        this.actionButton = null
        this.timer = null
        this.dragImage = this.getDragImage()
    }

    // *** Main game container ***
    getGameDiv() {
        this.gameDiv = document.createElement('div')
        this.gameDiv.style.margin = '0 auto'
        this.gameDiv.style.display = 'grid'
        this.gameDiv.style.justifyItems = 'center'
        this.gameDiv.style.alignItems = 'center'
        
        // Add game elements.
        this.gameDiv.appendChild(this.getBoardDiv())
        this.gameDiv.appendChild(this.getControlDiv())
       
        return this.gameDiv
    }

    // *** Game board  with slots for puzzle pieces ***

    getBoardDiv() {
        const boardDiv = document.createElement('div')
        boardDiv.style.backgroundColor = lightGray
        boardDiv.style.backgroundSize = 'cover'
        boardDiv.style.border = borderWidth + 'px' + ' solid'
        boardDiv.style.width = (slotSizePx * this.nBoardCols) + 'px'
        boardDiv.style.height = (slotSizePx * this.nBoardRows) + 'px'
        boardDiv.style.display = 'flex'
        boardDiv.style.flexWrap = 'wrap'
        for (let i = 0; i < nBoardRows * nBoardCols; i++) {
            boardDiv.appendChild(this.getBoardSlotDiv(i))
        }
        return boardDiv
    }

    getBoardSlotDiv(id) {
        // Generate a div element for board slots.
        
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
            event.dataTransfer.setDragImage(this.dragImage, slotSizePx / 2, slotSizePx / 2)
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

    getDragImage() {
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
        return dragDiv
    }

    // *** Button to start the game and share after you win ***
    
    getActionButton() {
        this.actionButton = document.createElement('div')
        this.actionButton.classList.add('action-button')
        this.actionButton.style.backgroundColor = yellow
        this.actionButton.style.border = borderWidth + 'px solid'
        this.actionButton.style.borderRadius = borderRadius
        this.actionButton.style.width = (baseSize * 3) + 'px'
        this.actionButton.style.height = (baseSize * 3) + 'px'
        this.actionButton.style.marginTop = baseSize + 'px'
        this.actionButton.style.fontFamily = font
        this.actionButton.style.fontSize = fontSize + 'em'
        this.actionButton.style.fontWeight = 'bold'
        this.actionButton.style.color = darkGray
        this.actionButton.style.display = 'flex'
        this.actionButton.style.alignItems = 'center'
        this.actionButton.style.justifyContent = 'center'
        this.actionButton.style.userSelect = 'none'
        return this.actionButton
    }

    setActionButtonClick(func) {
        this.actionButton.onclick = func
    }

    setActionButtonImage(imgStr) {
        this.actionButton.style.backgroundImage = imgStr
    }

    setActionButtonText(textStr) {
        this.actionButton.innerHTML = textStr
    }

    // *** Timer display ***

    getTimer() {
        this.timer = document.createElement('div')
        this.timer.classList.add('timer')
        this.timer.style.backgroundColor = yellow
        this.timer.style.border = borderWidth + 'px solid'
        this.timer.style.borderRadius = borderRadius
        this.timer.style.width = (baseSize * 6) + 'px'
        this.timer.style.height = (baseSize * 3) + 'px'
        this.timer.style.marginTop = baseSize + 'px'
        this.timer.innerHTML = '00:00:00'
        this.timer.style.fontFamily = font
        this.timer.style.fontSize = fontSize + 'em'
        this.timer.style.fontWeight = 'bold'
        this.timer.style.color = darkGray
        this.timer.style.display = 'flex'
        this.timer.style.alignItems = 'center'
        this.timer.style.justifyContent = 'center'
        this.timer.style.userSelect = 'none'
        return this.timer
    }

    showTime(timeStr) {
        this.timer.innerHTML = timeStr
    }

    // *** Area containing the game controls (anything outside the board) ***

    getControlDiv() {
        const controlDiv = document.createElement('div')
        controlDiv.style.width = (baseSize * 20) + 'px'
        controlDiv.style.height = (baseSize * 5) + 'px'
        controlDiv.style.backgroundColor = lightGray
        controlDiv.style.border = borderWidth + 'px solid'
        controlDiv.style.borderRadius = borderRadius
        controlDiv.style.marginTop = baseSize + 'px'
        controlDiv.style.marginLeft = 'auto'
        controlDiv.style.marginRight = 'auto'
        controlDiv.style.display = 'flex'
        controlDiv.style.justifyContent = 'space-around'
        controlDiv.appendChild(this.getActionButton())
        controlDiv.appendChild(this.getTimer())
        return controlDiv
    }

}    