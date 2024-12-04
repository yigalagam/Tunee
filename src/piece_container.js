// Abstract class for a container of pieces, with slots that can have a piece present or be empty.

class PieceContainer {
    
    constructor(nSlots, testMode) {
        // Initialize with all empty slots.
        this.nSlots = nSlots
        this.slots = new Array(nSlots).fill(null);
        this.slotsGUI = []
        this.testMode = testMode
    }

    reset() {
        this.slots = new Array(this.nSlots).fill(null)
        this.slotsGUI = []
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

    play(slotIndex) {
        if (this.slots[slotIndex] != null) {
            // Play piece in slot.
            return this.slots[slotIndex].play()
        }
        // Empty slot.
        return null
    }

    startGUI(component) {
        this.slotsGUI = Array.from(document.getElementsByClassName(component + '-slot'))

        // The GUI has to match the back end.
        if (this.slotsGUI.length  > 0 && (this.slotsGUI.length != this.nSlots)) {
            throw new Error(component + ': Number of slot GUI elements (' + this.slotsGUI.length + ') does not match the number of slots (' + this.nSlots + ')')
        }

        this.updateGUI()
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
            this.slotsGUI[slotIndex].draggable = true
            // Prevent dropping pieces in an occupied slot.
            this.slotsGUI[slotIndex].ondragover = null
        })

        freeSlots.forEach(slotIndex => {
            // Remove piece class from unoccupied slots.
            this.slotsGUI[slotIndex].classList.remove('piece')
            this.slotsGUI[slotIndex].draggable = false
            // This listener is needed to allow dropping pieces in this slot.
            this.slotsGUI[slotIndex].ondragover = (event) => {
                event.stopPropagation()
                event.preventDefault()
            }
        })
    }

}