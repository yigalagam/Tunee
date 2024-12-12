class Game {
    
    constructor(nPieces, boardSize, testMode, debugMode=false) {
        // Initialize a game from an audio file.
        // boardSize: [# rows, # columns].

        this.nPieces = nPieces
        this.testMode = testMode
        this.debugMode = debugMode
        this.gameEnded = false

        // Segment object to be populated when loading an audio file.
        this.segment = null
        this.solution = null

        // Game board where all the pieces are laid out.
        this.boardSize = boardSize
        this.board = new Board(boardSize[0], boardSize[1], this.testMode, this.debugMode)

        // Properties used to handle moving pieces.
        this.slotBeingMovedFrom = ''
        this.slotBeingMovedElement = null
    }

    start(wavFile) {
        this.segment = new Segment(wavFile, this.testMode, this.debugMode)
        this.solution = this.segment.divide(this.nPieces)
        this.board.reset()
        this.board.loadPieces(this.solution)
        this.board.startGUI()
        this.gameEnded = false
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

    endGUI() {
        this.board.endGUI()
    }

    slotClick(slotIndex) {
        // Click on a puzzle piece.
        this.board.playSequence(slotIndex)
    }

    slotDrag(slotElement) {
        // Callback function when a piece is getting dragged.
        this.slotBeingMovedElement = slotElement
        slotElement.classList.add('piece-dragged')
        if (this.board.playing) {
            if (this.debugMode) {
                console.log('Slot moving, interrupting audio')
            }
            this.board.stopPlaying()
        }
    }

    slotDragEnd() {
        console.log(this.slotBeingMovedElement)
        this.slotBeingMovedElement.classList.remove('piece-dragged')
    }

    slotDrop(slotElement) {
        // Callback function when a piece is getting dropped.

        if (!this.gameEnded) {
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
