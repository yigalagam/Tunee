// Board that contains all the pieces that are not in the audio player.

class Board {

    constructor(guiManager, nRows, nCols, testMode, debugMode=false) {
        
        this.nSlots = nRows * nCols
        if (guiManager.boardSlots.length != this.nSlots) {
            throw new Error('Number of slot GUI elements (' + this.slotsGUI.length + ') does not match the number of slots (' + this.nSlots + ')')
        }
        this.guiManager = guiManager
        this.scWidget = null
        this.baseVolume = null

        // Initialize with all empty slots.
        this.width = nCols
        this.slots = new Array(this.nSlots).fill(null);
        this.slotsGUI = []
        this.testMode = testMode
        this.debugMode = debugMode

        // Properties to control audio conflicts.
        this.playing = false
        this.playingInterrupted = false
        this.playEndEventHandler = null

    }

    reset() {
        this.slots = new Array(this.nSlots).fill(null)
        this.updateGUI()
    }
    
    loadPieces(pieces, scWidget) {
        // Load a set of pieces into the board, with a soundcloud widget to play them.
        
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

        this.scWidget = scWidget
        this.scWidget.getVolume(function(volume) {
            // Record soundcloud player volume for fade-in and fade-out.
            this.baseVolume = volume;
        }.bind(this))

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
    
    async playMultipleSlots(startSlot, endSlot, previousPiece=null) {
        // Play the content of the player between two slot indexes.

        if (startSlot > endSlot) {
            // Reached the end of the played piece set.
            this.scWidget.bind(SC.Widget.Events.PAUSE, () => {
                this.scWidget.unbind(SC.Widget.Events.PAUSE)
                this.playing = false
                this.playingInterrupted = false
            })
            this.scWidget.pause()
            return
        }

        if (!this.playingInterrupted) {
            const playingPiece = this.slots[startSlot]
            this.playing = true

            // If this piece is contiguous with the previous one, just keep playing without seeking.
            // This avoids a hiccup from the player.
            if ((previousPiece != null) && (playingPiece.index != previousPiece.index + 1)) {
                this.scWidget.seekTo(playingPiece.startTime * 1000)
            }
                        
            // Show piece as playing.
            this.guiManager.setSlotPiecePlaying(startSlot)

            // Make sure nothing else plays until this piece is done playing.
            // Set timeout for the duration of the piece, then play the next piece.
            this.scWidget.bind(SC.Widget.Events.PLAY, () => {
                this.scWidget.unbind(SC.Widget.Events.PLAY)
                setTimeout(() => {
                    // Remove "playing piece" visualization once playing is done.
                    this.guiManager.setSlotPieceNotPlaying(startSlot)
                    this.playMultipleSlots(startSlot + 1, endSlot, playingPiece)
                }, (playingPiece.endTime - playingPiece.startTime) * 1000)
            })
            this.scWidget.play()

            document.addEventListener('playEnd', this.playEndEventHandler)

        } else {
            // There was a player interaction that interrupted the music, stop playing.
            
            if (this.debugMode) {
                console.log('Playing interrupted, not playing slot ' + startSlot)
            }

            this.guiManager.setSlotPieceNotPlaying(startSlot)
            this.scWidget.bind(SC.Widget.Events.PAUSE, () => {
                this.scWidget.unbind(SC.Widget.Events.PAUSE)
                this.playing = false
                this.playingInterrupted = false
            })
            this.scWidget.pause()
            this.playing = false
            this.playingInterrupted = false
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