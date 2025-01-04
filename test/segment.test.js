describe('Segment Test', () =>  {
    it('Divide to 10 pieces', () => {
        const segment = new Segment(null, 19.76, 27.11, true)
        const pieces = segment.divide(10)
        expect(pieces.length).toBe(10)

        // All pieces should be the same length, 1/10 of the total segment length.
        expect(pieces[0].startTime).toBeCloseTo(19.76, 6)
        expect(pieces[0].endTime).toBeCloseTo(20.495, 6)
        expect(pieces[1].startTime).toBeCloseTo(20.495, 6)
        expect(pieces[1].endTime).toBeCloseTo(21.23, 6)
        expect(pieces[5].startTime).toBeCloseTo(23.435, 6)
        expect(pieces[5].endTime).toBeCloseTo(24.17, 6)
        expect(pieces[8].startTime).toBeCloseTo(25.64, 6)
        expect(pieces[8].endTime).toBeCloseTo(26.375, 6)
        expect(pieces[9].startTime).toBeCloseTo(26.375, 6)
        expect(pieces[9].endTime).toBeCloseTo(27.11, 6)
        
        // Fade in on first piece, fade out on last piece, no fade on others.
        expect(pieces[0].fade).toBe(1)
        expect(pieces[1].fade).toBe(0)
        expect(pieces[5].fade).toBe(0)
        expect(pieces[8].fade).toBe(0)
        expect(pieces[9].fade).toBe(2)

        // Verify that piece indexes are assigned correctly (only used in testing).
        for (let i = 0; i < 10; i++) {
            expect(pieces[i].index).toBe(i)
        }
    })
})

