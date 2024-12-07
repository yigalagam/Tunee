class Game {
    
    constructor(nPieces, boardSize, testMode, debugMode=false) {
        // Initialize a game from an audio file.

        if (boardSize < nPieces) {
            throw new Error('Board size must be at least the number of pieces')
        }

        this.nPieces = nPieces
        this.testMode = testMode
        this.debugMode = debugMode

        // Segment object to be populated when loading an audio file.
        this.segment = null
        this.solution = null

        // Containers for pieces: game board and the audio player.
        // Player will be fully initialized when loading an audio file.
        this.board = new Board(boardSize, this.testMode, this.debugMode)
        this.audioPlayer = null

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
        this.audioPlayer = new AudioPlayer(this.nPieces, this.segment.duration, this.segment.sampleRate, this.testMode, this.debugMode)
        this.audioPlayer.reset()
        this.audioPlayer.startGUI()
    }
    

    getObjectFromComponentName(component) {
        let obj
        if (component == 'board') {
            obj = this.board
        } else if (component == 'audio-player') {
            obj = this.audioPlayer
        } else {
            throw new Error("Component must be 'board' or 'audio-player', not " + component)
        }
        return obj
    }

    end() {
        this.endGUI()
    }

    movePiece(originStr, originIndex, destStr, destIndex) {
        // Move a piece between any two slots on the board or inside the audio player.

        // Parse origin and destination (could be the same).
        originStr = originStr.toLowerCase()
        destStr = destStr.toLowerCase()

        const origin = this.getObjectFromComponentName(originStr)
        const dest = this.getObjectFromComponentName(destStr)

        // If a legal move (slot with a piece to a slot without a piece) return true, otherwise false.
        if (origin.isSlotOccupied(originIndex) && !dest.isSlotOccupied(destIndex)) {
            const piece = origin.removePiece(originIndex)
            dest.insertPiece(destIndex, piece)
            if (this.debugMode) {
                console.log('Moved from ' + originStr + ' ' + originIndex + ' to ' + destStr + ' ' + destIndex)
            }
            return true
        }
        console.log('Unable to move from ' + originStr + ' ' + originIndex + ' to ' + destStr + ' ' + destIndex)
        return false
    }

    isSolved() {
        // Check if the pieces in the audio player form the full solution in the right order.

        for (let i = 0; i < this.audioPlayer.nSlots; i++) {
            if (this.audioPlayer.slots[i] != this.solution[i]) {
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
        this.audioPlayer.endGUI()
    }

    slotClick(component, index) {
        // Click on a puzzle piece.
        let obj = this.getObjectFromComponentName(component)
        obj.play(index)
    }

    playClick() {
        // Click on audio player "play" button.
        if (this.audioPlayer != null) {
            this.audioPlayer.playAllSlots(true)
        }
    }

    slotDrag(component, element) {
        // Callback function when a piece is getting dragged.
        this.slotBeingMovedFrom = component
        this.slotBeingMovedElement = element
        element.classList.add('piece-dragged')
    }

    slotDragEnd() {
         // Change the apperance of the dragged slot back to normal.
         this.slotBeingMovedElement.classList.remove('piece-dragged')
   }

    slotDrop(component, element) {
        // Change the apperance of the dragged slot back to normal.
        this.slotBeingMovedElement.classList.remove('piece-dragged')
        // Callback function when a piece is getting dropped.
        this.movePiece(this.slotBeingMovedFrom, this.slotBeingMovedElement.id, component, element.id)

        // Check if puzzle is solved.
        if (this.isSolved()) {
            this.end()
            this.audioPlayer.playAllSlots()
        }
    }

}
