class Segment {
    
    constructor(startTime, endTime, testMode) {
        // Initialize musical segment with sound data.

        // Time boundaries of played music in seconds.
        this.startTime = startTime
        this.endTime = endTime
        this.testMode = testMode
    }

    divide(nPieces) {
        // Divide segment into a number of pieces of equal length.
        // Create piece objects and return an array of pieces, each containing a different part of the segment.

        const pieceDuration = (this.endTime - this.startTime) / nPieces
        let currTime = this.startTime
        const pieces = [];
        let fade
        for (let i = 0; i < nPieces; i += 1) {
            if (i == 0) {
                // Fade in when playing the first piece.
                fade = 0//1
            } else if (i == nPieces - 1) {
                // Fade out when playing the last piece.
                fade = 0//2
            } else {
                fade = 0
            }
            pieces.push(new Piece(currTime, currTime + pieceDuration, fade, i, this.testMode))
            currTime += pieceDuration
        }
        return pieces
    }

}
