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

    play(slotIndex) {
        if (this.slots[slotIndex] != null) {
            // Play piece in slot.
            const playedSound = this.slots[slotIndex].play()
            if (!this.testMode) {
                this.slotsGUI[slotIndex].classList.add('piece-playing')
                this.slots[slotIndex].audioSource.onended = () => {
                    if (this.debugMode) {
                        console.log('Piece in slot ' + slotIndex + ' finished playing')
                    }
                    this.slotsGUI[slotIndex].classList.remove('piece-playing')
                }
            }
            return playedSound
        }
        // Empty slot.
        return null
    }

    startGUI() {
        // Gather all the divs that belong to the board.
        super.startGUI('board')
    }

}