class Game {
    
    constructor(segment, nPieces, boardSize, testMode) {
        // Initialize a game from an audio segment.

        if (boardSize < nPieces) {
            throw new Error('Board size must be at least the number of pieces')
        }

        this.nPieces = nPieces
        this.testMode = testMode

        // Parse the input segment. The solution is stored as an array of pieces.
        this.segment = segment
        this.solution = segment.divide(nPieces)
        
        // Containers for pieces: game board and the audio player.
        this.board = new Board(boardSize, this.testMode)
        this.audioPlayer = new AudioPlayer(nPieces, segment.duration, segment.sampleRate, this.testMode)

    }

    start() {
        // Start or restart a game with pieces scattered randomly on the board.
        this.board.loadPieces(this.solution)
        this.audioPlayer.reset()
        this.startGUI
    }

    movePiece(origin, originIndex, dest, destIndex) {
        // Move a piece between any two slots on the board or inside the audio player.

        // Parse origin and destination (could be the same).
        origin = origin.toLowerCase()
        dest = dest.toLowerCase()
        if (origin == 'board') {
            origin = this.board
        } else if (origin == 'player') {
            origin = this.audioPlayer
        } else {
            throw new Error("Origin must be 'board' or 'player'")
        }
        if (dest == 'board') {
            dest = this.board
        } else if (dest == 'player') {
            dest = this.audioPlayer
        } else {
            throw new Error("Destination must be 'board' or 'player'")
        }

        if ((origin == dest) && (originIndex == destIndex)) {
            throw new Error('Origin and destination cannot be the same')
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

}
