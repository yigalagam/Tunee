// Abstract class for a container of pieces, with slots that can have a piece present or be empty.

class PieceContainer {
    
    constructor(nSlots) {
        // Initialize with all empty slots.
        this.nSlots = nSlots
        this.slots = new Array(nSlots).fill(null);
    }

    reset() {
        this.slots = new Array(this.nSlots).fill(null)
    }
    
    isSlotOccupied(slotIndex) {
        return this.slots[slotIndex] != null
    }

    insertPiece(slotIndex, piece) {
        if (this.isSlotOccupied(slotIndex)) {
            throw new Error('Slot ' + slotIndex + ' is already populated, cannot insert piece')
        }
        this.slots[slotIndex] = piece
    }

    removePiece(slotIndex) {
        if (!this.isSlotOccupied(slotIndex)) {
            throw new Error('Slot ' + slotIndex + ' is not populated, cannot remove piece')
        }
        const piece = this.slots[slotIndex]
        this.slots[slotIndex] = null
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
        return piece
    }
}