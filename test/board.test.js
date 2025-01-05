describe('Board Test', () =>  {
    
    beforeEach(() => {
        this.guiManager = new GUIManager('Test', 3, 5)
        this.board = new Board(guiManager, 3, 5, true)
        this.segment = new Segment(null, 5, 12.2, true)
        this.pieces = this.segment.divide(4)
        this.board.loadPieces(this.pieces)
        this.occupiedSlots = this.board.getOccupiedSlots()
        this.freeSlots = this.board.getFreeSlots()
    });

    afterEach(() => {
        this.guiManager.close()
    })

    it('Constructor', () => {
        expect(() => { this.board.loadPieces(this.pieces.concat(this.pieces)) }).toThrowError('Board is not wide enough for 8 pieces')
    })

    it('Load pieces', () => {
        expect(this.board.nSlots).toBe(15)
        
        // We cannot verify the piece locations directly because JS does not allow setting the random seed.
        // Instead, we will count the number of occupied slots.
        expect(this.occupiedSlots.length).toBe(4)
    })

    it ('Get maximum number of adjacent pieces', () => {
        // Helper for ensuring pieces are sufficiently scattered on the board.
        
        const piece = this.pieces[2]

        this.board.slots = [piece, piece, piece, piece, null, null, null, null, null, null, null, null]
        expect(this.board.getMaxAdjacentCount()).toBe(4)

        // 3 in first row, 1 in second row.
        this.board.slots = [null, null, piece, piece, piece, null, null, null, null, null, null, null, null, null, null]
        expect(this.board.getMaxAdjacentCount()).toBe(3)

        // 1 in first row, 5 in second row, 1 in third row.
        this.board.slots = [null, null, null, null, piece, piece, piece, piece, piece, piece, piece, null, null, null, null]
        expect(this.board.getMaxAdjacentCount()).toBe(5)        

        this.board.slots = [null, null, null, null, piece, piece, piece, null, piece, piece, piece, null, piece, null, piece]
        expect(this.board.getMaxAdjacentCount()).toBe(2)
    })

    it('Play sequence', async () => {
        // Play sound between the nearest gaps around a slot.

        this.board.reset()
        this.board.insertPiece(0, this.pieces[3])
        this.board.insertPiece(5, this.pieces[2])
        this.board.insertPiece(6, this.pieces[0])
        this.board.insertPiece(8, this.pieces[1])
        
        // Shoule return the sound from a single piece.
        let piece, playedSound, refSound
        piece = this.board.slots[0]
        expect(this.board.playSequence(0)).toEqual([0, 0])
        piece = this.board.slots[8]
        expect(this.board.playSequence(8)).toEqual([8, 8])

        // Should return the sound from two consecutive pieces.        
        piece = this.board.slots[5]
        expect(this.board.playSequence(5)).toEqual([5, 6])

        // Verify that playing ends at right edge of the board (doesn't play into slot 5 in the 2nd row).
        this.board.insertPiece(3, this.pieces[0])
        this.board.insertPiece(4, this.pieces[1])
        expect(this.board.playSequence(3)).toEqual([3, 4])

        // If we click on slot 4, slot 3 should not play, even though they are adjacent.
        expect(this.board.playSequence(4)).toEqual([4, 4])

        // Trying to play from empty slots should not do anything.
        expect(this.board.playSequence(1)).toBe(null)
        expect(this.board.playSequence(2)).toBe(null)
        expect(this.board.playSequence(7)).toBe(null)
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

