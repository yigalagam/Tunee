describe('Audio Player Test', () =>  {
    
    beforeEach(() => {
        this.segment = new Segment('small.wav', true)
        this.pieces = this.segment.divide(9)
        this.audioPlayer = new AudioPlayer(9, this.segment.duration, this.segment.sampleRate, true)
    });
    
    it('Constructor', () => {
        // Slot duration is calculated from number of samples in segment and sample rate.
        expect(this.audioPlayer.slotDuration).toBeCloseTo(0.035, 3)

        // Verify length of "silent" array for unoccupied slots.
        expect(this.audioPlayer.silentPiece.sound[0].length).toBe(40)
        expect(this.audioPlayer.silentPiece.sound[1].length).toBe(40)
    })

    it('Insert, remove and move pieces', () => {
        // Insert piece from board (outside player) into player.
        this.audioPlayer.insertPiece(2, this.pieces[7])
        expect(this.audioPlayer.slots[2]).toBe(this.pieces[7])
        expect(this.audioPlayer.isSlotOccupied(2)).toBe(true)

        // Try to insert another piece into the same slot.
        expect(() => { this.audioPlayer.insertPiece(2, this.pieces[4]) }).toThrowError('Slot 2 is already populated, cannot insert piece')
        expect(this.audioPlayer.slots[2]).toBe(this.pieces[7])
        expect(this.audioPlayer.isSlotOccupied(2)).toBe(true)

        // Move the piece to a different slot.
        this.audioPlayer.movePiece(2, 8)
        expect(this.audioPlayer.slots[8]).toBe(this.pieces[7])
        expect(this.audioPlayer.isSlotOccupied(8)).toBe(true)
        expect(this.audioPlayer.isSlotOccupied(2)).toBe(false)

        // Remove piece.
        this.audioPlayer.removePiece(8)
        expect(this.audioPlayer.isSlotOccupied(8)).toBe(false)

        // Try to remove the piece again from an empty slot.
        expect(() => { this.audioPlayer.removePiece(8) }).toThrowError('Slot 8 is not populated, cannot remove piece')
        expect(this.audioPlayer.isSlotOccupied(8)).toBe(false)
    })

    it('Play slot', async () => {
        // Play from a slot to the nearest gap.

        this.audioPlayer.insertPiece(0, this.pieces[4])
        this.audioPlayer.insertPiece(5, this.pieces[2])
        this.audioPlayer.insertPiece(6, this.pieces[0])
        this.audioPlayer.insertPiece(8, this.pieces[1])
        
        // Shoule return the sound from a single piece.
        let piece, playedSound, refSound
        piece = audioPlayer.slots[0]
        playedSound = await this.audioPlayer.play(0)
        refSound = [await piece.play(true)]
        expect(playedSound).toEqual(refSound)
        piece = audioPlayer.slots[8]
        playedSound = await this.audioPlayer.play(8)
        refSound = [await piece.play(true)]
        expect(playedSound).toEqual(refSound)

        // Should return the sound from two consecutive pieces.        
        piece = audioPlayer.slots[5]
        const piece2 = audioPlayer.slots[6]
        playedSound = await this.audioPlayer.play(5)
        refSound = [await piece.play(true), await piece2.play(true)]
        expect(playedSound).toEqual(refSound)

        // Trying to play from empty slots should not do anything.
        expect(this.audioPlayer.play(1)).toBe(null)
        expect(this.audioPlayer.play(2)).toBe(null)
        expect(this.audioPlayer.play(7)).toBe(null)
    })
    
    it('Play all slots', async () => {
        this.audioPlayer.insertPiece(2, this.pieces[7])
        this.audioPlayer.insertPiece(3, this.pieces[0])
        this.audioPlayer.insertPiece(8, this.pieces[2])
        this.audioPlayer.insertPiece(1, this.pieces[8])

        // In test mode, the played sound is returned as a 2-channel array.
        // The last piece is 37 samples instead of 40, therefor slot 1 only has 37 samples.
        const playedSound = await this.audioPlayer.playAllSlots()
        expect(playedSound[1]).toEqual(this.pieces[8].sound)
        expect(playedSound[2]).toEqual(this.pieces[7].sound)
        expect(playedSound[3]).toEqual(this.pieces[0].sound)        
        expect(playedSound[8]).toEqual(this.pieces[2].sound)        

        // All the unoccupied slots should play zero in both channels.
        expect(playedSound[0][0].every(num => num == 0)).toBe(true)
        expect(playedSound[4][1].every(num => num == 0)).toBe(true)
        expect(playedSound[5][0].every(num => num == 0)).toBe(true)
        expect(playedSound[6][1].every(num => num == 0)).toBe(true)
        expect(playedSound[7][0].every(num => num == 0)).toBe(true)
    })

})