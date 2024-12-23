class Segment {
    
    constructor(wavFile, testMode, debugMode=false) {
        if (debugMode) {
            console.log('Loading ' + wavFile)
        }

        const audioData = loadAudioData(wavFile)
        this.sound = [audioData.left, audioData.right]
        this.sampleRate = audioData.sampleRate
        this.testMode = testMode
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
            pieces.push(new Piece(sound, this.sampleRate, indices[index], this.testMode))
            index++
        }
        return pieces
    }
}
