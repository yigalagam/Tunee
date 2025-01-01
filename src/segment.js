class Segment {
    
    constructor(id, testMode, debugMode=false) {
        if (debugMode) {
            console.log('Loading ' + id)
        }

        const audioData = loadAudioData(id)
        // Audio data is inverted and reversed to mask the content.
        this.sound = [audioData[0].reverse().map(num => -num), audioData[1].reverse().map(num => -num)]
        this.sampleRate = audioData[2]

        // Load song information, accounting for ASCII shift to hide the information.

        if (audioData.length > 3) {
            this.songTitle = shiftAscii(audioData[3], -1)
        } else {
            this.songTitle = null
        }

        if (audioData.length > 4) {
            this.youtubeId = shiftAscii(audioData[4], -1)
        } else {
            this.youtubeId = null
        }

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

function shiftAscii(str, shift) {
    return str.split('').map((char) => String.fromCharCode(char.charCodeAt(0) + shift)).join('');
}