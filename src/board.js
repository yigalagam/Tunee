// Board that contains all the pieces that are not in the audio player.

class Board extends PieceContainer {

    constructor(nSlots, testMode) {
        super(nSlots, testMode)
    }

    loadPieces(pieces) {
        // Load a set of pieces into the board.
        this.reset()
        
        const nPieces = pieces.length
        if (this.nSlots < nPieces) {
            throw new Error('Not enough slots on the board to place all pieces')
        }

        // Randomly populate slots with pieces.
        let pieceLocations = [...Array(this.nSlots)].map((_, i) => i);
        pieceLocations.sort(() => Math.random() - 0.5);
        pieceLocations = pieceLocations.slice(0, nPieces)
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