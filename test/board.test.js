describe('Board Test', () =>  {
    
    beforeEach(() => {
        this.board = new Board(12, true)
        this.segment = new Segment('small.wav', true)
        this.pieces = this.segment.divide(4)
        this.board.loadPieces(this.pieces)
        this.occupiedSlots = this.board.getOccupiedSlots()
        this.freeSlots = this.board.getFreeSlots()
    });
    
    it('Load pieces', () => {

        expect(this.board.nSlots).toBe(12)
        
        // We cannot verify the piece locations directly because JS does not allow setting the random seed.
        // Instead, we will count the number of occupied slots.
        expect(this.occupiedSlots.length).toBe(4)
    })

    it('Play', () => {

        // Board.play() in test mode should return the sound from the correcponding piece object.
        this.occupiedSlots.forEach(slotIndex => {
            const sound = board.play(slotIndex, true)
            let piece = board.slots[slotIndex]
            expect(sound).toBe(piece.play(true))
        })

        // Trying to play from empty slots should throw an error.
        for (let slotIndex = 0; slotIndex < this.board.nSlots; slotIndex ++) {
            if (!this.occupiedSlots.includes(slotIndex)) {
                expect(() => { this.board.play(slotIndex, true) }).toThrowError('No piece to play in slot ' + slotIndex)
            }
        }

    })

    it('Move pieces', () => {

        // Move piece from 2nd occupied slot to 3rd free slot.
        let fromSlot = this.occupiedSlots[1]
        const piece = this.board.slots[fromSlot]
        let toSlot = this.freeSlots[2]
        this.board.movePiece(fromSlot, toSlot)
        expect(this.board.slots[fromSlot]).toBe(null)
        expect(this.board.slots[toSlot]).toEqual(piece)

        // Try to move a piece from an empty slot.
        fromSlot = this.freeSlots[5]
        toSlot = this.freeSlots[1]
        expect(() => { this.board.movePiece(fromSlot, toSlot) }).toThrowError('Slot ' + fromSlot + ' is not populated, cannot move piece')

        // Try to move a piece into an occupied slot.
        fromSlot = this.occupiedSlots[0]
        toSlot = this.occupiedSlots[3]
        expect(() => { this.board.movePiece(fromSlot, toSlot) }).toThrowError('Slot ' + toSlot + ' is already populated, cannot move piece')

    })

})

