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
        expect(this.audioPlayer.zeroArray.length).toBe(40)
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

    it('Play', () => {

        this.audioPlayer.insertPiece(3, this.pieces[4])
        
        // AudioPlayer.play() in test mode should return the sound from the correcponding piece object.
        let piece = audioPlayer.slots[3]
        expect(this.audioPlayer.play(3)).toBe(piece.play(true))

        // Trying to play from empty slots should not do anything.
        expect(this.audioPlayer.play(1)).toBe(null)
        expect(this.audioPlayer.play(2)).toBe(null)
        expect(this.audioPlayer.play(7)).toBe(null)
    })
    
    it('Play Segment', () => {
        this.audioPlayer.insertPiece(2, this.pieces[7])
        this.audioPlayer.insertPiece(3, this.pieces[0])
        this.audioPlayer.insertPiece(8, this.pieces[2])
        this.audioPlayer.insertPiece(1, this.pieces[8])

        // In test mode, the played sound is returned as a 2-channel array.
        // The last piece is 37 samples instead of 40, therefor slot 1 only has 37 samples.
        const playedSound = this.audioPlayer.playSegment(true)
        expect(playedSound[0].slice(40, 77)).toEqual(this.pieces[8].sound[0])
        expect(playedSound[1].slice(40, 77)).toEqual(this.pieces[8].sound[1])
        expect(playedSound[0].slice(77, 117)).toEqual(this.pieces[7].sound[0])
        expect(playedSound[1].slice(77, 117)).toEqual(this.pieces[7].sound[1])
        expect(playedSound[0].slice(117, 157)).toEqual(this.pieces[0].sound[0])
        expect(playedSound[1].slice(117, 157)).toEqual(this.pieces[0].sound[1])
        expect(playedSound[0].slice(317, 357)).toEqual(this.pieces[2].sound[0])
        expect(playedSound[1].slice(317, 357)).toEqual(this.pieces[2].sound[1])

        // All the unoccupied slots should play zero in both channels.
        expect(playedSound[0].slice(0, 40).every(num => num == 0)).toBe(true)
        expect(playedSound[1].slice(0, 40).every(num => num == 0)).toBe(true)
        expect(playedSound[0].slice(157, 317).every(num => num == 0)).toBe(true)
        expect(playedSound[1].slice(157, 317).every(num => num == 0)).toBe(true)
    })

})