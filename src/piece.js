class Piece {

    constructor(sound, sampleRate, index, testMode) {
        // Initialize puzzle piece with sound data.
        
        this.sound = sound
        this.sampleRate = sampleRate
        this.index = index
        this.testMode = testMode
        this.gui = null

        if (!this.testMode) {
            // Set up audio playing for this piece.

            // Create an AudioBuffer
            this.audioBuffer = Piece.audioContext.createBuffer(2, this.sound[0].length, this.sampleRate)

            // Fill the buffer with data
            const leftChannel = this.audioBuffer.getChannelData(0)
            const rightChannel = this.audioBuffer.getChannelData(1)
            leftChannel.set(this.sound[0])
            rightChannel.set(this.sound[1])

            // Normalize the data (assuming values are in the range of -32768 to 32767)
            const normalizationFactor = 1 / 32768;
            for (let i = 0; i < this.sound[0].length; i++) {
                leftChannel[i] = this.sound[0][i] * normalizationFactor;
                rightChannel[i] = this.sound[1][i] * normalizationFactor;
            }
            this.audioSource = null
        }
    }

    static audioContext = new AudioContext()

    play() {
        if (!this.testMode) {
            // Create an AudioBufferSourceNode.
            this.audioSource = Piece.audioContext.createBufferSource()
            this.audioSource.buffer = this.audioBuffer
            // Connect the source to the context's destination.
            this.audioSource.connect(Piece.audioContext.destination)
            this.audioSource.start()

            console.log(this.sound)
        }
        return this.sound   
    }

}