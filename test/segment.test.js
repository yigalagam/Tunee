describe('Segment Test', () =>  {
    it('Divide to 10 pieces', () => {
        const segment = new Segment('small.wav', true)
        const pieces = segment.divide(10)
        expect(pieces.length).toBe(10)

        // All pieces but the last one should be the same length.
        expect(pieces[0].sound[0]).toEqual(segment.sound[0].slice(0, 36))
        expect(pieces[4].sound[1]).toEqual(segment.sound[1].slice(144, 180))
        expect(pieces[8].sound[0]).toEqual(segment.sound[0].slice(288, 324))
        expect(pieces[9].sound[1]).toEqual(segment.sound[1].slice(324))
        expect(pieces[9].sound[1].length).toBe(33)

        // Verify sample rate (same as segment).
        pieces.forEach(piece => {
            expect(piece.sampleRate).toBe(segment.sampleRate)
        })
    })
})

