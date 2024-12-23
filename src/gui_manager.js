class GUIManager {

    constructor(name, nBoardRows, nBoardCols, testMode, debugMode) {

        this.name = name

        this.nBoardRows = nBoardRows
        this.nBoardCols = nBoardCols
        
        this.gameDiv = null
        this.controlDiv = null
        this.boardSlots = []
        this.actionButton = null
        this.timer = null
        this.dragImage = this.getDragImage()

        this.testMode = testMode
        this.debugMode = debugMode

        this.gameDiv = this.getGameDiv()
    }

    close() {
        if (this.gameDiv) {
            this.gameDiv.remove()
        }
    }

    // *** Main game container ***
    getGameDiv() {
        this.gameDiv = document.createElement('div')
        this.gameDiv.style.margin = '0 auto'
        this.gameDiv.style.display = 'grid'
        this.gameDiv.style.justifyItems = 'center'
        this.gameDiv.style.alignItems = 'center'
        
        // Add game elements.
        this.gameDiv.appendChild(this.getTitleDiv())
        this.gameDiv.appendChild(this.getBoardDiv())
        this.gameDiv.appendChild(this.getControlDiv())
       
        return this.gameDiv
    }

    // *** Game board  with slots for puzzle pieces ***

    getTitleDiv() {
        const mainTitleDiv = document.createElement('div')
        mainTitleDiv.style.fontFamily = font
        mainTitleDiv.style.fontSize = titleFontSizeEM + 'em'
        mainTitleDiv.style.fontWeight = 'bold'
        mainTitleDiv.style.color = darkGray
        mainTitleDiv.innerHTML = this.name

        const subTitleDiv = document.createElement('div')
        subTitleDiv.style.fontFamily = font
        subTitleDiv.style.fontSize = subtitleFontSizeEM + 'em'
        subTitleDiv.style.fontWeight = 'bold'
        subTitleDiv.style.color = lightGray
        subTitleDiv.innerHTML = 'Put the puzzle pieces in the right order to play some music!'

        const titleDiv = document.createElement('div')
        titleDiv.style.display = 'grid'
        titleDiv.style.placeItems = 'center'
        titleDiv.appendChild(mainTitleDiv)
        titleDiv.appendChild(subTitleDiv)

        return titleDiv
    }
    
    getBoardDiv() {
        const boardDiv = document.createElement('div')
        boardDiv.style.backgroundColor = lightGray
        boardDiv.style.border = borderWidth + 'px' + ' solid'
        boardDiv.style.width = (slotSizePx * this.nBoardCols) + 'px'
        boardDiv.style.height = (slotSizePx * this.nBoardRows) + 'px'
        boardDiv.style.marginTop = (2 * baseSizePx) + 'px'
        boardDiv.style.display = 'flex'
        boardDiv.style.flexWrap = 'wrap'
        for (let i = 0; i < this.nBoardRows * this.nBoardCols; i++) {
            const slotDiv = this.getBoardSlotDiv(i)
            boardDiv.appendChild(slotDiv)
            this.boardSlots.push(slotDiv)
        }
        return boardDiv
    }

    getBoardSlotDiv(id) {
        // Generate a div element for board slots.

        const slotDiv = document.createElement('div')
        slotDiv.classList.add('board-slot')
        slotDiv.id = id
        slotDiv.style.width = (slotSizePx) + 'px'
        slotDiv.style.height = (slotSizePx) + 'px'
        slotDiv.style.border = 'dotted 0.25px'
        slotDiv.style.boxSizing = 'border-box'
        slotDiv.draggable = false
        
        slotDiv.onclick = () => {
            if (debugMode) {
                console.log('Play: slot ' + slotDiv.id)
            }
            game.slotClick(Number(slotDiv.id))
        }

        // Set up drag and drop listeners for moving pieces.
        slotDiv.ondragstart = (event) => {
            if (debugMode) {
                console.log('Drag start: slot ' + slotDiv.id)
            }
            event.stopPropagation()
            event.dataTransfer.setDragImage(this.dragImage, slotSizePx / 2, slotSizePx / 2)
            event.dataTransfer.effectAllowed = 'move'
            game.slotDrag(slotDiv)
        }
        slotDiv.ondragend = (event) => {
            if (debugMode) {
                console.log('Drag end: slot ' + slotDiv.id)
            }
            event.preventDefault()
            game.slotDragEnd()
        }
        
        slotDiv.ondrop = () => {
            if (debugMode) {
                console.log('Drop: slot ' + slotDiv.id)
            }
            game.slotDrop(slotDiv)
        }

        return slotDiv
    }

    getDragImage() {
        const dragImage = new Image();
        dragImage.src = '../images/piece_dragged.png';
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

    setSlotPiece(slotIndex) {
        // Slot occupied by a puzzle piece.
        // Show the piece and make it draggable so it can be moved.

        this.boardSlots[slotIndex].classList.add('piece')
        this.boardSlots[slotIndex].draggable = true
        // Prevent dropping pieces in an occupied slot.
        this.boardSlots[slotIndex].ondragover = null
    }

    setSlotEmpty(slotIndex) {
        // Empty slot without a puzzle piece.
        this.boardSlots[slotIndex].classList.remove('piece')
        this.boardSlots[slotIndex].draggable = false
        // This listener is needed to allow dropping pieces in this slot.
        this.boardSlots[slotIndex].ondragover = (event) => {
            event.stopPropagation()
            event.preventDefault()
        }
    }

    setSlotPieceDragged(slotIndex) {
        this.boardSlots[slotIndex].classList.add('piece-dragged')
    }

    setSlotPieceDropped(slotIndex) {
        this.boardSlots[slotIndex].classList.remove('piece-dragged')
    }

    setSlotPiecePlaying(slotIndex) {
        // Slot currently playing, has a different appearance than other slots.
        this.boardSlots[slotIndex].classList.add('piece-playing')
    }

    setSlotPieceNotPlaying(slotIndex) {
        // Slot that finished playing, remove special appearance.
        this.boardSlots[slotIndex].classList.remove('piece-playing')
    }

    inactivateBoard() {
        let slotGUI
        for (let slotIndex = 0; slotIndex < this.nSlots; slotIndex++) {
            slotGUI = this.boardSlots[slotIndex]
            if (this.debugMode) {
                console.log('Inactivating slot ' + slotIndex)
            }
            slotGUI.draggable = false
        }
    }

    // *** Button to start the game and share after you win ***
    
    getActionButton() {
        this.actionButton = document.createElement('div')
        this.actionButton.classList.add('action-button')
        this.actionButton.style.backgroundColor = yellow
        this.actionButton.style.border = borderWidth + 'px solid'
        this.actionButton.style.borderRadius = borderRadius
        this.actionButton.style.width = (10 * baseSizePx) + 'px'
        this.actionButton.style.height = (10 * baseSizePx) + 'px'
        this.actionButton.style.fontFamily = font
        this.actionButton.style.fontSize = fontSizeEM + 'em'
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
        this.actionButton.style.backgroundSize = 'cover'
    }

    setActionButtonText(textStr) {
        this.actionButton.innerHTML = textStr
    }

    setActionButtonGameOn() {
        this.setActionButtonText('')
        this.setActionButtonImage("url('../images/game_on.png')")
        this.setActionButtonClick(null)
    }

    setActionButtonShare(shareFunc) {
        this.setActionButtonImage('')
        this.setActionButtonText('Share')
        this.setActionButtonClick(shareFunc)
    }

    setActionButtonCopied(shareFunc) {
        this.setActionButtonText('Copied')
        this.setActionButtonClick(null)
        setTimeout(shareFunc, copiedDelay)
    }

    // *** Timer display ***

    getTimer() {
        this.timer = document.createElement('div')
        this.timer.classList.add('timer')
        this.timer.style.backgroundColor = yellow
        this.timer.style.border = borderWidth + 'px solid'
        this.timer.style.borderRadius = borderRadius
        this.timer.style.width = (15 * baseSizePx) + 'px'
        this.timer.style.height = (8 * baseSizePx) + 'px'
        this.timer.style.fontFamily = font
        this.timer.style.fontSize = fontSizeEM + 'em'
        this.timer.style.fontWeight = 'bold'
        this.timer.style.color = darkGray
        this.timer.style.display = 'flex'
        this.timer.style.alignItems = 'center'
        this.timer.style.justifyContent = 'center'
        this.timer.style.userSelect = 'none'
        this.timer.innerHTML = '00:00'
        return this.timer
    }

    showTime(timeStr) {
        this.timer.innerHTML = timeStr
    }

    // *** Area containing the game controls (anything outside the board) ***

    getControlDiv() {
        const controlDiv = document.createElement('div')
        controlDiv.style.width = controlDivWidthPx + 'px'
        controlDiv.style.height = controlDivHeightPx + 'px'
        controlDiv.style.backgroundColor = lightGray
        controlDiv.style.border = borderWidth + 'px solid'
        controlDiv.style.borderRadius = borderRadius
        controlDiv.style.marginLeft = 'auto'
        controlDiv.style.marginRight = 'auto'
        controlDiv.style.marginTop = baseSizePx + 'px'
        controlDiv.style.display = 'flex'
        controlDiv.style.justifyContent = 'space-around'
        controlDiv.style.alignItems = 'center'
        controlDiv.appendChild(this.getActionButton())
        controlDiv.appendChild(this.getTimer())
        this.controlDiv = controlDiv
        return controlDiv
    }

    startSharing() {
        // Fade out the control panel and fade in the sharing panel.

        const shareManager = new ShareManager(this.timer.innerHTML, this.debugMode)
        const shareDiv = shareManager.getShareDiv()

        this.controlDiv.style.opacity = 1
        const fadeOutInterval = setInterval(() => {
            if (this.controlDiv.style.opacity > 0) {
                this.controlDiv.style.opacity -= 0.1
            } else {
                this.controlDiv.remove()
                clearInterval(fadeOutInterval)
                this.gameDiv.appendChild(shareDiv)
            }
        }, shareFadeoutInterval / 10)
    }

}    