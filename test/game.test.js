describe('Game Test', () =>  {
    
    beforeEach(() => {

        // Start a new game from a Game object.
        this.guiManager = new GUIManager('Test', 3, 14)
        this.game = new Game(this.guiManager, 11, [3, 14], true)
    })

    afterEach(() => {
        this.guiManager.close()
    })

    it('Constructor', () => {
        // No audio loaded yet.
        expect(this.game.segment).toBe(null)
        expect(this.game.solution).toBe(null)

        // Before the game begins, all board slots should be empty.
        expect(this.game.board.nSlots, 24)
        expect(this.game.board.getOccupiedSlots().length).toBe(0)
    })

    it('Start', () => {
        // Start a new game with a song from Youtube.
        this.game.start('Our Song', '123456789', 15.72, 22.39)
        expect(this.guiManager.songTitle).toBe('Our Song')
        expect(this.game.solution.length).toBe(11)
        expect(this.game.board.getOccupiedSlots().length).toBe(11)
    })

    it('Move pieces', () => {
        this.game.start('small.wav')
        const occupiedBoardSlots = this.game.board.getOccupiedSlots()
        const freeBoardSlots = this.game.board.getFreeSlots()

        // Occupied to unoccupied slot on board.
        let fromSlot = occupiedBoardSlots[4]
        let toSlot = freeBoardSlots[2]
        moved = this.game.movePiece(fromSlot, toSlot)
        expect(moved).toBe(true)
        expect(this.game.board.isSlotOccupied(fromSlot)).toBe(false)
        expect(this.game.board.isSlotOccupied(toSlot)).toBe(true)

        // Illegal move into an occupied slot on board.
        fromSlot = occupiedBoardSlots[0]
        toSlot = occupiedBoardSlots[1]
        fromPiece = this.game.board.slots[fromSlot]
        toPiece = this.game.board.slots[toSlot]
        moved = this.game.movePiece(fromSlot, toSlot)
        // Should return false and pieces should not change.
        expect(moved).toBe(false)
        expect(this.game.board.slots[fromSlot]).toBe(fromPiece)
        expect(this.game.board.slots[toSlot]).toBe(toPiece)

        // Illegal move from free slot on board.
        fromSlot = freeBoardSlots[1]
        toSlot = freeBoardSlots[3]
        moved = this.game.movePiece(fromSlot, toSlot)
        expect(moved).toBe(false)
        expect(this.game.board.isSlotOccupied(fromSlot)).toBe(false)
        expect(this.game.board.isSlotOccupied(toSlot)).toBe(false)
    })


    it('Check solution', () => {

        this.game.start('small.wav')
        this.game.board.reset()

        // Full solution forced into player using a copy of the solution.
        for (let i = 0; i < this.game.nPieces; i++) {
            this.game.board.slots[3 + i] = this.game.solution[i]
        }
        expect(this.game.isSolved()).toBe(true)

        // Swap two pieces so that the order is incorrect.
        const temp = this.game.board.slots[5]
        this.game.board.slots[5] = this.game.board.slots[6]
        this.game.board.slots[6] = temp
        expect(this.game.isSolved()).toBe(false)

        // Remove a piece so there is a gap.
        this.game.board.slots[5] = this.game.board.slots[6]
        this.game.board.removePiece(6)
        expect(this.game.isSolved()).toBe(false)

        // Solution in right order but spanning multiple rows.
        this.game.board.reset()
        for (let i = 0; i < this.game.nPieces; i++) {
            this.game.board.slots[4 + i] = this.game.solution[i]
        }
        expect(this.game.isSolved()).toBe(false)

        // Solution at the end of the last row.
        this.game.board.reset()
        for (let i = 0; i < this.game.nPieces; i++) {
            this.game.board.slots[31 + i] = this.game.solution[i]
        }
        expect(this.game.isSolved()).toBe(true)
    })

    it('GUI', () => {

        this.game.start('small.wav')
        
        boardSlots = this.guiManager.boardSlots

        // Occupied board slots should have 'piece' added to the class list, be draggable, and not respond to drop events.
        const occupiedSlots = this.game.board.getOccupiedSlots()
        const freeBoardSlots = this.game.board.getFreeSlots()
        occupiedSlots.forEach(slotIndex => {
            expect(boardSlots[slotIndex].classList).toContain('piece')
            expect(boardSlots[slotIndex].draggable).toBe(true)
            expect(boardSlots[slotIndex].ondragover).toBe(null)
        })
        freeBoardSlots.forEach(slotIndex => {
            expect(boardSlots[slotIndex].classList).not.toContain('piece')
            expect(boardSlots[slotIndex].draggable).toBe(false)
            expect(boardSlots[slotIndex].ondragover).not.toBe(null)
        })

        // Move pieces and verify that the GUI components change accordingly.
        let fromSlot = occupiedSlots[3]
        let toSlot = freeBoardSlots[18]
        this.game.movePiece(fromSlot, toSlot)
        expect(boardSlots[fromSlot].classList).not.toContain('piece')
        expect(boardSlots[fromSlot].ondragover).not.toBe(null)
        expect(boardSlots[fromSlot].draggable).toBe(false)
        expect(boardSlots[toSlot].classList).toContain('piece')
        expect(boardSlots[toSlot].ondragover).toBe(null)
        expect(boardSlots[toSlot].draggable).toBe(true)
    })

})