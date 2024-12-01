class Segment {
    
    constructor(wavFile, testMode) {

        // Load wav file into audio buffer.
        if (testMode) {
            const testData = loadTestData(wavFile)
            this.sound = testData[0]
            this.sampleRate = testData[1]
            this.duration = this.sound[0].length / this.sampleRate
        }
    }

    divide(nPieces) {
        // Divide segment into a number of pieces of equal length, in random order.

        // Create random piece positions.
        const indices = Array.from({ length: nPieces }, (_, i) => i)
        indices.sort(() => Math.random() - 0.5);

        // Verify content of pieces.
        // Create piece objects and return an array of pieces, each containing a different part of the segment.
        const pieces = [];
        const nSamples = this.sound[0].length
        const chunkSize = Math.ceil(nSamples / nPieces);
        let index = 0
        for (let i = 0; i < nSamples; i += chunkSize) {
            const sound = [this.sound[0].slice(i, i + chunkSize), this.sound[1].slice(i, i + chunkSize)]
            pieces.push(new Piece(sound, this.sampleRate, indices[index]))
            index++
        }
        return pieces
    }
}
