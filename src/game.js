class Game {
    
    constructor(guiManager, nPieces, boardSize, testMode, debugMode=false) {
        // Initialize a game from an audio file.
        // boardSize: [# rows, # columns].

        this.guiManager = guiManager
        this.nPieces = nPieces
        this.testMode = testMode
        this.debugMode = debugMode
        this.gameEnded = false

        // Segment object to be populated when loading an audio file.
        this.segment = null
        this.solution = null

        // Game board where all the pieces are laid out.
        this.boardSize = boardSize
        this.board = new Board(this.guiManager, boardSize[0], boardSize[1], this.testMode, this.debugMode)

        // Timer that runs until the puzzle is solved.
        this.timer = new Timer(this.guiManager)

        // Properties used to handle moving pieces.
        this.slotBeingMovedFrom = ''
        this.slotBeingMovedElement = null
    }

    start(songTitle, soundCloudID, startTime, endTime) {
        // Initialize a soundcloud widget object with a music track, then start game.
        this.guiManager.setSongTitle(songTitle)

        if (!this.testMode) {
            const scWidget = this.guiManager.getSoundcloudWidget(soundCloudID)
            scWidget.bind(SC.Widget.Events.READY, () => {
                scWidget.unbind(SC.Widget.Events.READY)
                this.soundcloudReady(scWidget, startTime, endTime)
            })
        } else {
            this.soundcloudReady(null, startTime, endTime)
        }

    }

    soundcloudReady(scWidget, startTime, endTime) {
        this.segment = new Segment(startTime, endTime, this.testMode)
        this.solution = this.segment.divide(this.nPieces)
        this.board.reset()
        this.board.loadPieces(this.solution, scWidget)
        this.gameEnded = false
        this.startGUI()
        this.timer.start()
    }

    end() {
        this.endGUI()
        this.gameEnded = true
    }

    movePiece(originIndex, destIndex) {
        // Move a piece between any two slots on the board.

        // If a legal move (slot with a piece to a slot without a piece) return true, otherwise false.
        if (this.board.isSlotOccupied(originIndex) && !this.board.isSlotOccupied(destIndex)) {
            this.board.movePiece(originIndex, destIndex)
            if (this.debugMode) {
                console.log('Moved from slot ' + originIndex + ' to slot ' + destIndex)
            }
            return true
        }
        console.log('Unable to move from slot ' + originIndex + ' to slot ' + destIndex)
        return false
    }

    isSolved() {
        // Check if the pieces are arranged on the board in the right order to play the segment.
        
        // Find the location of the first piece of the solution.
        const firstIndex = this.board.findPiece(this.solution[0])

        // The solution has to be arranged in a single row.
        if (firstIndex % this.boardSize[1] > this.boardSize[1] - this.nPieces) {
            return false
        } 

        // Check if the other slots match the solution.
        for (let i = firstIndex; i < firstIndex + this.nPieces; i++) {
            if (this.board.slots[i] != this.solution[i - firstIndex]) {
                if (this.debugMode) {
                    console.log('Solution check: not solved')
                }
                return false
            }
        }
        console.log('Solution check: solved')
        return true
    }

    // ***** GUI Management ***** //

    startGUI() {
        this.board.updateGUI()
        this.timer.startGUI()
        this.guiManager.setActionButtonGameOn()
    }

    endGUI() {
        this.guiManager.inactivateBoard()
        this.timer.stop()
        this.guiManager.endGame()
    }

    slotClick(slotIndex) {
        // Click on a puzzle piece.
        this.board.playSequence(slotIndex)
    }

    slotDrag(slotElement) {
        // Callback function when a piece is getting dragged.
        this.slotBeingMovedElement = slotElement
        this.guiManager.setSlotPieceDragged(Number(slotElement.id))
        if (this.board.playing) {
            if (this.debugMode) {
                console.log('Slot ' + slotElement.id + ' moving, interrupting audio')
            }
            this.board.stopPlaying()
        }
    }

    slotDragEnd() {
        this.guiManager.setSlotPieceDropped(Number(this.slotBeingMovedElement.id))
        this.slotBeingMovedElement = null
    }

    slotDrop(slotElement) {
        // Callback function when a piece is getting dropped.

        if (!this.gameEnded) {
            if (this.debugMode) {
                console.log('Dropped on Slot: ' + slotElement.id)
            }

            this.movePiece(Number(this.slotBeingMovedElement.id), Number(slotElement.id))

            // Check if puzzle is solved.
            if (this.isSolved()) {
                const firstIndex = this.board.findPiece(this.solution[0])
                this.board.playSequence(firstIndex)
                this.end()
            }
        }
    }
}