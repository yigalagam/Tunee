// Board that contains all the pieces that are not in the audio player.

class Board {

    static isPlaying = false

    constructor(nRows, nCols, testMode, debugMode=false) {
        // Initialize with all empty slots.
        this.width = nCols
        this.nSlots = nRows * nCols
        this.slots = new Array(this.nSlots).fill(null);
        this.slotsGUI = []
        this.testMode = testMode
        this.debugMode = debugMode
    }

    reset() {
        this.slots = new Array(this.nSlots).fill(null)
        this.slotsGUI = []
        this.startGUI()
    }
    
    loadPieces(pieces) {
        // Load a set of pieces into the board.
        this.reset()
        
        const nPieces = pieces.length
        if (this.width < nPieces) {
            throw new Error('Board is not wide enough for ' + nPieces + ' pieces')
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
    
    playPiece(slotIndex) {
        // Play a single piece in slot.
        if (this.slots[slotIndex] != null) {
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

    playSequence(slotIndex) {
        // Play the content of a player from the nearest gap or the from left edge of the board to the nearest gap or to the right edge of the board.
        
        if (this.slots[slotIndex] != null) {
             // Search left.
                 let startSlotIndex = slotIndex - 1
                 while ((this.slots[startSlotIndex] != null) && (startSlotIndex % this.width != this.width - 1)) {
                    startSlotIndex--
             }
 
            // search right.
            let endSlotIndex = slotIndex + 1
            while ((this.slots[endSlotIndex] != null) && (endSlotIndex % this.width != 0)) {
                endSlotIndex++
            }

            return this.playMultipleSlots(startSlotIndex + 1, endSlotIndex - 1, false)
        }
        // Empty slot.
        return null
    }
    
    async playMultipleSlots(startSlot, endSlot) {
        // Play the content of the player between two slot indexes, pausing at slots with no pieces.

        if (!this.testMode) {
            console.log('Playing from slot : ' + startSlot + ' to ' + endSlot)
            if (startSlot > endSlot) {
               return
            }

            if (!Board.isPlaying) {
                Board.isPlaying = true
                let pieceToPlay
                if (this.isSlotOccupied(startSlot)) {
                    pieceToPlay = this.slots[startSlot]
                    this.slotsGUI[startSlot].classList.add('piece-playing')
                } else {
                    pieceToPlay = this.silentPiece
                    this.slotsGUI[startSlot].classList.add('piece-playing-empty-slot')
                }
                pieceToPlay.play()

                pieceToPlay.audioSource.onended = () => {
                    console.log('Slot ' + startSlot + ' finished playing')
                    this.slotsGUI[startSlot].classList.remove('piece-playing')
                    this.slotsGUI[startSlot].classList.remove('piece-playing-empty-slot')
                    Board.isPlaying = false
                    this.playMultipleSlots(startSlot + 1, endSlot)
                }
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

    startGUI() {
        this.slotsGUI = Array.from(document.getElementsByClassName('board-slot'))

        // The GUI has to match the back end.
        if (this.slotsGUI.length  > 0 && (this.slotsGUI.length != this.nSlots)) {
            throw new Error(component + ': Number of slot GUI elements (' + this.slotsGUI.length + ') does not match the number of slots (' + this.nSlots + ')')
        }

        this.updateGUI()
    }

    endGUI() {
        let slotGUI
        for (let slotIndex = 0; slotIndex < this.nSlots; slotIndex++) {
            slotGUI = this.slotsGUI[slotIndex]
            if (this.debugMode) {
                console.log('Ending GUI for slot ' + slotIndex)
            }
            slotGUI.draggable = false
        }
    }

    updateGUI() {
        if (Array.from(this.slotsGUI).every(slotGUI => slotGUI == null)) {
            // No GUI, will be the case in some testing situations.
            return
        }

        const occupiedSlots = this.getOccupiedSlots()
        const freeSlots = this.getFreeSlots()
        
        occupiedSlots.forEach(slotIndex => {
            // Set piece class for occupied slots and make it draggable so it can be moved.
            this.slotsGUI[slotIndex].classList.add('piece')
            this.slotsGUI[slotIndex].src = '../images/piece.png'
            this.slotsGUI[slotIndex].draggable = true
            // Prevent dropping pieces in an occupied slot.
            this.slotsGUI[slotIndex].ondragover = null
        })

        freeSlots.forEach(slotIndex => {
            // Remove piece class from unoccupied slots.
            this.slotsGUI[slotIndex].classList.remove('piece')
            this.slotsGUI[slotIndex].src = ''
            this.slotsGUI[slotIndex].draggable = false
            // This listener is needed to allow dropping pieces in this slot.
            this.slotsGUI[slotIndex].ondragover = (event) => {
                event.stopPropagation()
                event.preventDefault()
            }
        })
    }

}