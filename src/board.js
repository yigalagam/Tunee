// Board that contains all the pieces that are not in the audio player.

class Board extends PieceContainer {

    constructor(nSlots, testMode, debugMode) {
        super(nSlots, testMode, debugMode)
    }

    loadPieces(pieces) {
        // Load a set of pieces into the board.
        this.reset()
        
        const nPieces = pieces.length
        if (this.nSlots < nPieces) {
            throw new Error('Not enough slots on the board to place all pieces')
        }

        // Randomly populate slots with pieces.
        const pieceLocations = Array.from({ length: this.nSlots }, (_, i) => i);
        for (let i = pieceLocations.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pieceLocations[i], pieceLocations[j]] = [pieceLocations[j], pieceLocations[i]];
        }
        for (let [i, loc] of pieceLocations.entries()) {
            this.slots[loc] = pieces[i]
        }

        this.startGUI()
    }

    startGUI() {
        // Gather all the divs that belong to the board.
        super.startGUI('board')
    }

}