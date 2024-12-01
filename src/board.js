// Board that contains all the pieces that are not in the audio player.

class Board extends PieceContainer {

    constructor(nSlots) {
        super(nSlots)
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
    }

    getOccupiedSlots() {
        const occupiedSlots = []
        for (let i = 0; i < this.nSlots; i++) {
            if (this.isSlotOccupied(i)) {
                occupiedSlots.push(i)
            }
        }
        return occupiedSlots
    }

    getFreeSlots() {
        const occupiedSlots = this.getOccupiedSlots()
        const freeSlots = []
        for (let i = 0; i < this.nSlots; i++) {
            if (!occupiedSlots.includes(i)) {
                freeSlots.push(i)
            }
        }
        return freeSlots
    }

    play(slotIndex, testMode) {
        // Play the audio in the piece contained in a slot.
        if (!this.isSlotOccupied(slotIndex)) {
            throw new Error('No piece to play in slot ' + slotIndex)
        }
        return this.slots[slotIndex].play(testMode)
    }
}