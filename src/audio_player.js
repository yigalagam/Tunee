// Audio player in which the puzzle player has to arrange the pieces in the right order.

class AudioPlayer extends PieceContainer {

    constructor(nSlots, segmentDuration, sampleRate, testMode, debugMode=false) {
        super(nSlots, testMode, debugMode)
        this.slotDuration = segmentDuration / nSlots
        this.sampleRate = sampleRate

        // Create a "silent" piece to play empty slots.
        const slotArrayLen = Math.round(this.slotDuration * this.sampleRate)
        const zeroSound = [Array(slotArrayLen).fill(0), Array(slotArrayLen).fill(0)]
        this.silentPiece = new Piece(zeroSound, this.sampleRate, -1, this.testMode)
    }

    static isPlaying = false
    
    async playSegment(slotIndex = 0) {
        // Play the content of the player, pausing at slots with no pieces.

        if (!this.testMode) {
            if (slotIndex >= this.nSlots) {
                this.playButton.classList.remove('audio-player-play-active')
                this.playButton.classList.add('audio-player-play')
                return
            }

            this.playButton.classList.remove('audio-player-play')
            this.playButton.classList.add('audio-player-play-active')
            if (!AudioPlayer.isPlaying) {
                AudioPlayer.isPlaying = true
                let pieceToPlay
                if (this.isSlotOccupied(slotIndex)) {
                    pieceToPlay = this.slots[slotIndex]
                    this.slotsGUI[slotIndex].classList.add('piece-playing')
                } else {
                    pieceToPlay = this.silentPiece
                    this.slotsGUI[slotIndex].classList.add('piece-playing-empty-slot')
                }
                pieceToPlay.play()

                pieceToPlay.audioSource.onended = () => {
                    console.log('Slot ' + slotIndex + ' finished playing')
                    this.slotsGUI[slotIndex].classList.remove('piece-playing')
                    this.slotsGUI[slotIndex].classList.remove('piece-playing-empty-slot')
                    AudioPlayer.isPlaying = false
                    this.playSegment(slotIndex + 1)
                }
            }

        } else {            
            // In test mode, just return the concatenated sound data.
            const soundOut = []
            let pieceToPlay
            for (let testSlotIndex = 0; testSlotIndex < this.nSlots; testSlotIndex++) {
                if (this.isSlotOccupied(testSlotIndex)) {
                    pieceToPlay = this.slots[testSlotIndex]
                } else {
                    pieceToPlay = this.silentPiece
                }
                soundOut.push(pieceToPlay.play())
            }
            return soundOut
        }
    }

    startGUI() {
        // Gather all the divs that belong to the audio player.
        super.startGUI('audio-player')
        this.playButton = document.querySelector('.audio-player-play')
    }

}