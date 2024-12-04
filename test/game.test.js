describe('Game Test', () =>  {
    
    beforeEach(() => {
        this.game = new Game(11, 16, true)
    });
    
    it('Constructor', () => {
        // No audio loaded yet.
        expect(this.game.segment).toBe(null)
        expect(this.game.solution).toBe(null)
        expect(this.game.audioPlayer).toBe(null)

        // Before the game begins, all board slots should be empty.
        expect(this.game.board.nSlots, 16)
        this.game.board.slots.forEach(slot => expect(slot).toBe(null))
    })

    it('Start', () => {
        // Start a new game from loaded segment.
        this.game.start('small.wav')

        expect(this.game.solution.length).toBe(11)

        expect(this.game.board.getOccupiedSlots().length).toBe(11)

        // All audio player slots should be empty until the user moves a piece.
        expect(this.game.audioPlayer.nSlots, 11)
        this.game.audioPlayer.slots.forEach(slot => expect(slot).toBe(null))

    })

    it('Move pieces', () => {
        this.game.start('small.wav')
        const occupiedBoardSlots = this.game.board.getOccupiedSlots()
        const freeBoardSlots = this.game.board.getFreeSlots()

        // Occupied to unoccupied slot on board.
        let fromSlot = occupiedBoardSlots[4]
        let toSlot = freeBoardSlots[2]
        moved = this.game.movePiece('board', fromSlot, 'board', toSlot)
        expect(moved).toBe(true)
        expect(this.game.board.isSlotOccupied(fromSlot)).toBe(false)
        expect(this.game.board.isSlotOccupied(toSlot)).toBe(true)

        // From board to player.
        fromSlot = toSlot
        toSlot = 1
        moved = this.game.movePiece('board', fromSlot, 'audio-player', toSlot)
        expect(moved).toBe(true)
        expect(this.game.board.isSlotOccupied(fromSlot)).toBe(false)
        expect(this.game.audioPlayer.isSlotOccupied(toSlot)).toBe(true)

        // From occupied to unoccupied audio player slot.
        fromSlot = toSlot
        toSlot = 7
        moved = this.game.movePiece('audio-player', fromSlot, 'audio-player', toSlot)
        expect(moved).toBe(true)
        expect(this.game.audioPlayer.isSlotOccupied(fromSlot)).toBe(false)
        expect(this.game.audioPlayer.isSlotOccupied(toSlot)).toBe(true)

        // Move piece back from player to board.
        fromSlot = toSlot
        toSlot = freeBoardSlots[0]
        moved = this.game.movePiece('audio-player', fromSlot, 'board', toSlot)
        expect(moved).toBe(true)
        expect(this.game.audioPlayer.isSlotOccupied(fromSlot)).toBe(false)
        expect(this.game.board.isSlotOccupied(toSlot)).toBe(true)

        // Illegal move into an occupied slot on board.
        fromSlot = occupiedBoardSlots[0]
        toSlot = occupiedBoardSlots[1]
        fromPiece = this.game.board.slots[fromSlot]
        toPiece = this.game.board.slots[toSlot]
        moved = this.game.movePiece('board', fromSlot, 'board', toSlot)
        // Should return false and pieces should not change.
        expect(moved).toBe(false)
        expect(this.game.board.slots[fromSlot]).toBe(fromPiece)
        expect(this.game.board.slots[toSlot]).toBe(toPiece)

        // Illegal move into an occupied slot in audio player.
        toSlot = 3
        this.game.movePiece('board', fromSlot, 'audio-player', toSlot)
        toPiece = this.game.audioPlayer.slots[toSlot]
        fromSlot = occupiedBoardSlots[6]
        fromPiece = this.game.board.slots[fromSlot]
        moved = this.game.movePiece('board', fromSlot, 'audio-player', toSlot)
        expect(moved).toBe(false)
        expect(this.game.board.slots[fromSlot]).toBe(fromPiece)
        expect(this.game.audioPlayer.slots[toSlot]).toBe(toPiece)

        // Illegal move from free slot on board.
        fromSlot = freeBoardSlots[1]
        toSlot = freeBoardSlots[3]
        moved = this.game.movePiece('board', fromSlot, 'board', toSlot)
        expect(moved).toBe(false)
        expect(this.game.board.isSlotOccupied(fromSlot)).toBe(false)
        expect(this.game.board.isSlotOccupied(toSlot)).toBe(false)
        // Illegal move from free slot in audio player.
        fromSlot = 6
        toSlot = 8
        moved = this.game.movePiece('audio-player', fromSlot, 'audio-player', toSlot)
        expect(moved).toBe(false)
        expect(this.game.audioPlayer.isSlotOccupied(fromSlot)).toBe(false)
        expect(this.game.audioPlayer.isSlotOccupied(toSlot)).toBe(false)
    })


    it('Check solution', () => {

        this.game.start('small.wav')

        // Empty player.
        expect(this.game.isSolved()).toBe(false)

        // Full solution forced into player using a copy of the solution.
        this.game.audioPlayer.slots = [...this.game.solution]
        expect(this.game.isSolved()).toBe(true)

        // Switch two pieces so that the solution is incomplete.
        const freeBoardSlots = this.game.board.getFreeSlots()
        moved = this.game.movePiece('audio-player', 4, 'Board', freeBoardSlots[0])
        // Not solved when one audio player slot is empty.
        expect(this.game.isSolved()).toBe(false)
        this.game.movePiece('audio-player', 3, 'audio-player', 4)
        this.game.movePiece('Board', freeBoardSlots[0], 'audio-player', 3)
        // Not solved because audio player slots 3 and 4 and flipped.
        expect(this.game.isSolved()).toBe(false)
        
        // Move back to the right configuration.
        this.game.movePiece('audio-Player', 4, 'Board', freeBoardSlots[0])
        this.game.movePiece('audio-player', 3, 'audio-player', 4)
        this.game.movePiece('Board', freeBoardSlots[0], 'audio-player', 3)
        expect(this.game.isSolved()).toBe(true)

    })

    it('GUI', () => {
        
        // Create board and audio player divs for testing, one for each slot.
        let guiElements = []
        let element
        for (let i = 0; i < 16; i++) {
            element = document.createElement('div')
            element.classList.add('board-slot')
            document.body.append(element)
            guiElements.push(element)
        }
        for (let i = 0; i < 11; i++) {
            element = document.createElement('div')
            element.classList.add('audio-player-slot')
            document.body.append(element)
            guiElements.push(element)
        }

        this.game.start('small.wav')

        // Occupied board slot should have 'piece' added to the class list.
        const occupiedSlots = this.game.board.getOccupiedSlots()
        const freeBoardSlots = this.game.board.getFreeSlots()
        occupiedSlots.forEach(slotIndex => {
            expect(this.game.board.slotsGUI[slotIndex].classList).toContain('piece')
        })
        freeBoardSlots.forEach(slotIndex => {
            expect(this.game.board.slotsGUI[slotIndex].classList).not.toContain('piece')
        })

        // All slots in audio player should be empty and not have 'piece' class added.
        Array.from(this.game.audioPlayer.slotsGUI).forEach(slotGUI => {
            expect(slotGUI.classList).not.toContain('piece')
        })

        // Move pieces and verify that the GUI components change accordingly.
        
        let fromSlot = occupiedSlots[3]
        let toSlot = freeBoardSlots[1]
        this.game.movePiece('board', fromSlot, 'board', toSlot)
        expect(this.game.board.slotsGUI[fromSlot].classList).not.toContain('piece')
        expect(this.game.board.slotsGUI[fromSlot].ondragover).not.toBe(null)
        expect(this.game.board.slotsGUI[fromSlot].draggable).toBe(false)
        expect(this.game.board.slotsGUI[toSlot].classList).toContain('piece')
        expect(this.game.board.slotsGUI[toSlot].ondragover).toBe(null)
        expect(this.game.board.slotsGUI[toSlot].draggable).toBe(true)
        
        fromSlot = occupiedSlots[6]
        toSlot = 10
        this.game.movePiece('board', fromSlot, 'audio-player', toSlot)
        expect(this.game.board.slotsGUI[fromSlot].classList).not.toContain('piece')
        expect(this.game.audioPlayer.slotsGUI[toSlot].classList).toContain('piece')

        fromSlot = toSlot
        toSlot = 5
        this.game.movePiece('audio-player', fromSlot, 'audio-player', toSlot)
        expect(this.game.audioPlayer.slotsGUI[fromSlot].classList).not.toContain('piece')
        expect(this.game.audioPlayer.slotsGUI[fromSlot].ondragover).not.toBe(null)
        expect(this.game.audioPlayer.slotsGUI[fromSlot].draggable).toBe(false)
        expect(this.game.audioPlayer.slotsGUI[toSlot].classList).toContain('piece')
        expect(this.game.audioPlayer.slotsGUI[toSlot].ondragover).toBe(null)
        expect(this.game.audioPlayer.slotsGUI[toSlot].draggable).toBe(true)

        fromSlot = toSlot
        toSlot = freeBoardSlots[3]
        this.game.movePiece('audio-player', fromSlot, 'board', toSlot)
        expect(this.game.audioPlayer.slotsGUI[fromSlot].classList).not.toContain('piece')
        expect(this.game.board.slotsGUI[toSlot].classList).toContain('piece')

        // Remove GUI elements.
        guiElements.forEach(guiElement => document.body.removeChild(guiElement));

    })

})