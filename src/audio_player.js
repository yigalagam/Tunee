// Audio player in which the puzzle player has to arrange the pieces in the right order.

class AudioPlayer extends PieceContainer {

    constructor(nSlots, segmentDuration, sampleRate, testMode, debugMode) {
        super(nSlots, testMode, debugMode)
        this.slotDuration = segmentDuration / nSlots
        this.sampleRate = sampleRate

        // Create a "silent" piece to play empty slots.
        const slotArrayLen = Math.round(this.slotDuration * this.sampleRate)
        const zeroSound = [Array(slotArrayLen).fill(0), Array(slotArrayLen).fill(0)]
        this.silentPiece = new Piece(zeroSound, this.sampleRate, -1)
    }

    static isPlaying = false
    
    async playSegment(slotIndex = 0) {
        // Play the content of the player, pausing at slots with no pieces.

        if (!this.testMode) {
            if (slotIndex >= this.nSlots) {
                return
            }

            if (!AudioPlayer.isPlaying) {
                AudioPlayer.isPlaying = true
                let pieceToPlay
                if (this.isSlotOccupied(slotIndex)) {
                    pieceToPlay = this.slots[slotIndex]
                } else {
                    pieceToPlay = this.silentPiece
                }
                pieceToPlay.play()

                pieceToPlay.audioSource.onended = () => {
                    AudioPlayer.isPlaying = false
                    this.playSegment(slotIndex + 1)
                }
            }
        }

        // Return the concatenated sound data.
        const soundOut = []
        for (let slotIndex = 0; slotIndex < this.nSlots; slotIndex++) {
            if (this.isSlotOccupied(slotIndex)) {
                soundOut.push(this.slots[slotIndex].sound)
            } else {
                soundOut.push(this.silentPiece.sound)
            }
        }
        if (this.debugMode) {
            console.log('Playing segment')
            console.log(soundOut)
        }
        return soundOut
    }

    startGUI() {
        // Gather all the divs that belong to the audio player.
        super.startGUI('audio-player')
    }

}