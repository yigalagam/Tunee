class Game {
    
    constructor(wavFile, nPieces, boardSize, testMode) {
        // Initialize a game from an audio file.

        if (boardSize < nPieces) {
            throw new Error('Board size must be at least the number of pieces')
        }

        this.nPieces = nPieces
        this.testMode = testMode

        // Parse the input segment. The solution is stored as an array of pieces.
        this.segment = new Segment(wavFile, testMode)
        this.solution = this.segment.divide(nPieces)
        
        // Containers for pieces: game board and the audio player.
        this.board = new Board(boardSize, this.testMode)
        this.audioPlayer = new AudioPlayer(nPieces, this.segment.duration, this.segment.sampleRate, this.testMode)

        // Properties used to handle moving pieces.
        this.slotBeingMovedFrom = ''
        this.slotBeingMovedElement = null
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

    start() {
        // Start or restart a game with pieces scattered randomly on the board.
        this.board.loadPieces(this.solution)
        this.audioPlayer.reset()
        this.startGUI()
    }

    movePiece(origin, originIndex, dest, destIndex) {
        // Move a piece between any two slots on the board or inside the audio player.

        // Parse origin and destination (could be the same).
        origin = origin.toLowerCase()
        dest = dest.toLowerCase()

        origin = this.getObjectFromComponentName(origin)
        dest = this.getObjectFromComponentName(dest)

        if ((origin == dest) && (originIndex == destIndex)) {
            return false
        }

        // If a legal move (slot with a piece to a slot without a piece) return true, otherwise false.
        if (origin.isSlotOccupied(originIndex) && !dest.isSlotOccupied(destIndex)) {
            const piece = origin.removePiece(originIndex)
            dest.insertPiece(destIndex, piece)
            return true
        }
        return false
    }

    isSolved() {
        // Check if the pieces in the audio player form the full solution in the right order.

        for (let i = 0; i < this.audioPlayer.nSlots; i++) {
            if (this.audioPlayer.slots[i] != this.solution[i]) {
                return false
            }
        }
        return true
    }

    startGUI() {
        this.gui = document.getElementsByClassName('game')
        this.board.startGUI(this.gui)
        this.audioPlayer.startGUI(this.gui)
    }

    slotClick(component, index) {
        let obj = this.getObjectFromComponentName(component)
        obj.play(index)
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
        // Callback function when a piece is getting dropped.
        this.movePiece(this.slotBeingMovedFrom, this.slotBeingMovedElement.id, component, element.id)
    }

}
