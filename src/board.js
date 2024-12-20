// Board that contains all the pieces that are not in the audio player.

class Board {

    constructor(guiManager, nRows, nCols, testMode, debugMode=false) {
        
        this.nSlots = nRows * nCols
        if (guiManager.boardSlots.length != this.nSlots) {
            throw new Error(component + ': Number of slot GUI elements (' + this.slotsGUI.length + ') does not match the number of slots (' + this.nSlots + ')')
        }
        this.guiManager = guiManager

        // Initialize with all empty slots.
        this.width = nCols
        this.slots = new Array(this.nSlots).fill(null);
        this.slotsGUI = []
        this.testMode = testMode
        this.debugMode = debugMode

        // Properties to control audio conflicts.
        this.playing = false
        this.playingInterrupted = false

    }

    reset() {
        this.slots = new Array(this.nSlots).fill(null)
        this.updateGUI()
    }
    
    loadPieces(pieces) {
        // Load a set of pieces into the board.
        
        const nPieces = pieces.length
        
        if (this.debugMode) {
            console.log('Loading ' + nPieces + ' pieces')
        }
        
        if (this.width < nPieces) {
            throw new Error('Board is not wide enough for ' + nPieces + ' pieces')
        }

        if (this.nSlots < 2* nPieces) {
            throw new Error('Board does not have enough space for ' + nPieces + ' pieces')
        }
        
        let ready = false
        while (!ready) {
            this.reset()
            
            // Randomly populate slots with pieces.
            const pieceLocations = Array.from({ length: this.nSlots }, (_, i) => i);
            for (let i = pieceLocations.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [pieceLocations[i], pieceLocations[j]] = [pieceLocations[j], pieceLocations[i]];
            }
            for (let [i, loc] of pieceLocations.entries()) {
                this.slots[loc] = pieces[i]
            }

            // Make sure there are at most two adjacent populated slots.
            const maxAdjacentCount = this.getMaxAdjacentCount()
            if (maxAdjacentCount <= 2) {
                ready = true
            } else if (this.debugMode) {
                console.log('Maximum of ' + maxAdjacentCount + ' adjacent pieces, reassigning slots')
            }
        }

        this.updateGUI()

    }

    getMaxAdjacentCount() {
        // Helper to ensure sufficient scatter of pieces.
        let adjacentCount = 0
        let maxAdjacentCount = 1
        let slot
        for (let slotIndex = 0; slotIndex < this.nSlots; slotIndex++) {
            slot = this.slots[slotIndex]
            if (slot != null) {
                if (slotIndex % this.width == 0) {
                    // New row.
                    adjacentCount = 1
                } else {
                    adjacentCount++
                    if (adjacentCount > maxAdjacentCount) {
                        maxAdjacentCount = adjacentCount
                    }
                }
            } else {
                adjacentCount = 0
            }
        }
        return maxAdjacentCount
    }

    isSlotOccupied(slotIndex) {
        return this.slots[slotIndex] != null
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

    playSequence(slotIndex) {
        // Play the content of a player from a slot to the nearest gap or to the right edge of the board.
        
        // Any click on a piece or on an empty slot should stop the audio playing.
        if (this.playing) {
            this.stopPlaying()
            return
        }

        if (this.slots[slotIndex] != null) {
            // search for additional occupied slots on the right.
            let endSlotIndex = slotIndex + 1
            while ((this.slots[endSlotIndex] != null) && (endSlotIndex % this.width != 0)) {
                endSlotIndex++
            }
            if (this.debugMode) {
                console.log('Playing from slot : ' + slotIndex + ' to ' + (endSlotIndex - 1))
            }
            return this.playMultipleSlots(slotIndex, endSlotIndex - 1, false)
        }

        // Empty slot.
        console.log('Click on empty slot: ' + slotIndex)
        return null
    }
    
    async playMultipleSlots(startSlot, endSlot) {
        // Play the content of the player between two slot indexes, pausing at slots with no pieces.

        if (!this.testMode) {

            if (startSlot > endSlot) {
                this.playing = false
                this.playingInterrupted = false
                return
            }

            if (!this.playingInterrupted) {
                this.playing = true
                this.slots[startSlot].play()
                this.guiManager.setSlotPiecePlaying(startSlot)
                this.slots[startSlot].audioSource.onended = () => {
                    console.log('Slot ' + startSlot + ' finished playing')
                    this.guiManager.setSlotPieceNotPlaying(startSlot)
                    if (!this.playingInterrupted) {
                        this.playMultipleSlots(startSlot + 1, endSlot)
                    } else {
                        this.playingInterrupted = false
                    }
                }
            } else {
                this.playing = false
                this.playingInterrupted = false
            }

        } else {            
            // In test mode, just return the concatenated sound data.
            
            const soundOut = []
            let pieceToPlay
            for (let testSlotIndex = startSlot; testSlotIndex <= endSlot; testSlotIndex++) {
                if (this.isSlotOccupied(testSlotIndex)) {
                    pieceToPlay = this.slots[testSlotIndex]
                } else {
                    pieceToPlay = this.silentPiece
                }
                soundOut.push(pieceToPlay.play())
            }
            return soundOut
        }
    }

    stopPlaying() {
        if (this.playing) {
            if (this.debugMode) {
                console.log('Interrupting audio')
            }
            this.playing = false
            this.playingInterrupted = true
        }
    }

    insertPiece(slotIndex, piece) {
        if (this.isSlotOccupied(slotIndex)) {
            throw new Error('Slot ' + slotIndex + ' is already populated, cannot insert piece')
        }
        this.slots[slotIndex] = piece
        this.updateGUI()
    }

    removePiece(slotIndex) {
        if (!this.isSlotOccupied(slotIndex)) {
            throw new Error('Slot ' + slotIndex + ' is not populated, cannot remove piece')
        }
        const piece = this.slots[slotIndex]
        this.slots[slotIndex] = null
        this.updateGUI()
        return piece
    }

    movePiece(fromIndex, toIndex) {
        if (!this.isSlotOccupied(fromIndex)) {
            throw new Error('Slot ' + fromIndex + ' is not populated, cannot move piece')
        }
        if (this.isSlotOccupied(toIndex)) {
            throw new Error('Slot ' + toIndex + ' is already populated, cannot move piece')
        }
        const piece = this.slots[fromIndex]
        this.slots[fromIndex] = null
        this.slots[toIndex] = piece
        this.updateGUI()
        return piece
    }

    findPiece(piece) {
        // Return the slot index holding a specific piece.
        for (let slotIndex = 0; slotIndex < this.nSlots; slotIndex++) {
            if (this.slots[slotIndex] == piece) {
                return slotIndex
            }
        }
        // Not found.
        return -1
    }

    updateGUI() {

        const occupiedSlots = this.getOccupiedSlots()
        const freeSlots = this.getFreeSlots()
        
        occupiedSlots.forEach(slotIndex => {
            this.guiManager.setSlotPiece(slotIndex)
        })

        freeSlots.forEach(slotIndex => {
            this.guiManager.setSlotEmpty(slotIndex)
        })
    }

}