describe('Board Test', () =>  {
    
    beforeEach(() => {
        this.board = new Board(3, 4, true)
        this.segment = new Segment('small.wav', true)
        this.pieces = this.segment.divide(4)
        this.board.loadPieces(this.pieces)
        this.occupiedSlots = this.board.getOccupiedSlots()
        this.freeSlots = this.board.getFreeSlots()
    });

    it('Constructor', () => {
        const narrowBoard = new Board(5, 3, true)
        expect(() => { narrowBoard.loadPieces(this.pieces) }).toThrowError('Board is not wide enough for 4 pieces')
    })

    it('Load pieces', () => {
        expect(this.board.nSlots).toBe(12)
        
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
        this.board.slots = [null, piece, piece, piece, piece, null, null, null, null, null, null, null]
        expect(this.board.getMaxAdjacentCount()).toBe(3)

        // 1 in first row, 4 in second row, 1 in third row.
        this.board.slots = [null, null, null, piece, piece, piece, piece, piece, piece, null, null, null]
        expect(this.board.getMaxAdjacentCount()).toBe(4)        

        this.board.slots = [null, null, null, piece, piece, piece, null, piece, piece, piece, null, piece]
        expect(this.board.getMaxAdjacentCount()).toBe(2)
    })

    it('Play sequence', async () => {
        // Play sound between the nearest gaps around a slot.

        testBoard = new Board(3, 5, true)
        testBoard.insertPiece(0, this.pieces[3])
        testBoard.insertPiece(5, this.pieces[2])
        testBoard.insertPiece(6, this.pieces[0])
        testBoard.insertPiece(8, this.pieces[1])
        
        // Shoule return the sound from a single piece.
        let piece, playedSound, refSound
        piece = testBoard.slots[0]
        playedSound = await testBoard.playSequence(0)
        refSound = [await piece.play(true)]
        expect(playedSound).toEqual(refSound)
        piece = testBoard.slots[8]
        playedSound = await testBoard.playSequence(8)
        refSound = [await piece.play(true)]
        expect(playedSound).toEqual(refSound)

        // Should return the sound from two consecutive pieces.        
        piece = testBoard.slots[5]
        let piece2 = testBoard.slots[6]
        playedSound = await testBoard.playSequence(5)
        refSound = [await piece.play(true), await piece2.play(true)]
        expect(playedSound).toEqual(refSound)

        // Verify that playing ends at right edge of the board (doesn't play into slot 5 in the 2nd row).
        // Slot 3 should play even though we're clicking on slot 4.
        testBoard.insertPiece(3, this.pieces[0])
        testBoard.insertPiece(4, this.pieces[1])
        piece = testBoard.slots[3]
        piece2 = testBoard.slots[4]
        playedSound = await testBoard.playSequence(4)
        refSound = [await piece.play(true), await piece2.play(true)]
        expect(playedSound).toEqual(refSound)

        // With the same setup, verify that playing ends on the left side of the board.
        piece = testBoard.slots[5]
        piece2 = testBoard.slots[6]
        playedSound = await testBoard.playSequence(5)
        refSound = [await piece.play(true), await piece2.play(true)]
        expect(playedSound).toEqual(refSound)


        // Trying to play from empty slots should not do anything.
        expect(testBoard.playSequence(1)).toBe(null)
        expect(testBoard.playSequence(2)).toBe(null)
        expect(testBoard.playSequence(7)).toBe(null)
    })
    
    it('Play piece', () => {

        // Should return the sound from a single piece object.
        this.occupiedSlots.forEach(slotIndex => {
            const sound = board.playPiece(slotIndex, true)
            let piece = board.slots[slotIndex]
            expect(sound).toBe(piece.play(true))
        })

        // Trying to play from empty slots should not do anything.
        for (let slotIndex = 0; slotIndex < this.board.nSlots; slotIndex ++) {
            if (!this.occupiedSlots.includes(slotIndex)) {
                expect(this.board.playPiece(slotIndex, true)).toBe(null)
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

