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
            console.log(this.sound)
        }
        return this.sound   
    }
}