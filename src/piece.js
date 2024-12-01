class Piece {

    constructor(sound, sampleRate, index) {
        // Initialize puzzle piece with sound data.
        this.sound = sound
        this.sampleRate = sampleRate
        this.index = index
        this.gui = null
    }

    play(testMode=false) {
        if (!testMode) {
        } else {
            return this.sound   
        }
    }
}